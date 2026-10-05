import {InteractionManager, Linking} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SCREEN} from './screenname';
import {navigationRef} from './navigatorref';

const PREFIXES = [
  'https://demoupgrade.pageantplanet.com',
  'https://pageantplanet.com',
  'https://www.pageantplanet.com',
];

const extractPath = (url: string): string => {
  for (const prefix of PREFIXES) {
    if (url.startsWith(prefix)) {
      return url
        .slice(prefix.length)
        .replace(/^\/+/, '')
        .split('?')[0]
        .split('#')[0];
    }
  }
  const schemeStripped = url.replace(/^[a-z]+:\/\/[^/]+\//i, '');
  return schemeStripped.split('?')[0].split('#')[0];
};

type DeepLinkTarget = {
  screen: string;
  params?: Record<string, string>;
};

/**
 * Map a deep-link path to a screen registered inside the `DASHBOARD_NAVIGATION`
 * stack. Mirrors `linking.config.screens[DASHBOARD_NAVIGATION].screens` below.
 */
const resolveTarget = (path: string): DeepLinkTarget | undefined => {
  const [first, second, third] = path.split('/').filter(Boolean);

  if (first === 'shop' && second === 'product' && third) {
    return {screen: SCREEN.PRODUCT_DETAIL, params: {productId: third}};
  }
  if (first === 'shop') {
    return second
      ? {screen: SCREEN.SHOP, params: {slug: second}}
      : {screen: SCREEN.SHOP};
  }
  if (first === 'event' && second) {
    return {
      screen: SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
      params: {slugId: second},
    };
  }
  if (first === 'pageant' && second) {
    return {
      screen: SCREEN.PAGEANT_PUBLIC_PROFILE,
      params: {profileId: second},
    };
  }
  if (first === 'share' && second) {
    return {screen: SCREEN.CONVO_COMMENTS, params: {id: second}};
  }
  return undefined;
};

type NavRef = {
  isReady?: () => boolean;
  navigate: (...args: unknown[]) => void;
  dispatch: (action: unknown) => void;
  reset: (state: unknown) => void;
  getCurrentRoute?: () => {name?: string} | undefined;
} | null;

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

/**
 * Wait for the navigation container to report `isReady() === true`. After OS
 * resume the ref is sometimes attached before the internal focus listeners
 * finish wiring up.
 */
const waitForReady = async (timeoutMs = 3000): Promise<boolean> => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const nav = navigationRef.current as NavRef;
    if (nav && (!nav.isReady || nav.isReady())) {
      return true;
    }
    await sleep(100);
  }
  return false;
};

const getCurrentRouteName = (): string | null => {
  try {
    const nav = navigationRef.current as NavRef;
    return nav?.getCurrentRoute?.()?.name ?? null;
  } catch {
    return null;
  }
};

/**
 * Run a single navigation strategy and wait one tick so React Navigation can
 * apply the state update before we sample the focused route.
 */
const runStrategy = async (
  target: DeepLinkTarget,
  fn: (nav: NonNullable<NavRef>) => void,
): Promise<boolean> => {
  const nav = navigationRef.current as NavRef;
  if (!nav) {
    return false;
  }
  try {
    fn(nav);
  } catch {
    return false;
  }
  await sleep(250);
  return getCurrentRouteName() === target.screen;
};

/**
 * Warm-start handler.
 *
 * React Navigation's built-in URL listener (`useLinking` →
 * `getActionFromState` → `dispatch`) silently no-ops for this navigator
 * layout because every deep-link target is registered inside a single
 * `DASHBOARD_NAVIGATION` root route, so the diff against the current state
 * collapses. We resolve the screen ourselves and try a sequence of
 * navigation strategies, stopping at the first one that actually moves the
 * focused route to the target.
 */
const handleDeepLink = async (url: string) => {
  const path = extractPath(url);
  const target = resolveTarget(path);
  if (!target) {
    return;
  }

  await waitForReady();

  // Strategy 1: direct navigate — the pattern used by push notifications.
  if (await runStrategy(target, nav => nav.navigate(target.screen, target.params))) {
    return;
  }

  // Strategy 2: nested target syntax through DASHBOARD_NAVIGATION.
  if (
    await runStrategy(target, nav =>
      nav.navigate(SCREEN.DASHBOARD_NAVIGATION, {
        screen: target.screen,
        params: target.params,
      }),
    )
  ) {
    return;
  }

  // Strategy 3: explicit `CommonActions.navigate` with nested params.
  if (
    await runStrategy(target, nav =>
      nav.dispatch(
        CommonActions.navigate({
          name: SCREEN.DASHBOARD_NAVIGATION,
          params: {
            screen: target.screen,
            params: target.params,
          },
        }),
      ),
    )
  ) {
    return;
  }

  // Strategy 4: force a reset to a fully-formed nested state.
  await runStrategy(target, nav =>
    nav.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
          state: {
            index: 0,
            routes: [{name: target.screen, params: target.params}],
          },
        },
      ],
    }),
  );
};

/**
 * Deep link targets (event, shop, pageant, share, etc.) are registered on the
 * **EditProfile** stack, whose route on the root stack is
 * `SCREEN.DASHBOARD_NAVIGATION`. The nested `config.screens` shape lets
 * `getStateFromPath` build valid nested state on cold start; warm start is
 * handled manually via `handleDeepLink`.
 */
const linking = {
  prefixes: PREFIXES,
  config: {
    screens: {
      [SCREEN.DASHBOARD_NAVIGATION]: {
        screens: {
          [SCREEN.SHOP]: 'shop/:slug?',
          [SCREEN.PRODUCT_DETAIL]: 'shop/product/:productId',
          [SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE]: 'event/:slugId',
          [SCREEN.PAGEANT_PUBLIC_PROFILE]: 'pageant/:profileId',
          [SCREEN.CONVO_COMMENTS]: 'share/:id',
        },
      },
    },
  },
  /**
   * Cold start: the root stack mounts after auth storage is read; waiting
   * one frame + interactions lets React Navigation attach the nested deep-
   * link state instead of falling back to the home screen.
   */
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url == null) {
      return null;
    }
    await new Promise<void>(resolve => {
      InteractionManager.runAfterInteractions(() => resolve());
    });
    return url;
  },
  /**
   * Warm start (app open in background → tapped link).
   *
   * Defined on the module-level object so the reference is stable across
   * `NavigationContainer` re-renders — otherwise React Navigation's
   * `useLinking` effect tears down and re-registers the `url` listener every
   * render, dropping events that arrive during OS resume.
   *
   * We intentionally do NOT forward to `listener(url)`: see `handleDeepLink`
   * comment for why the built-in flow is bypassed.
   */
  subscribe(listener: (url: string) => void) {
    void listener;
    const handler = (event: {url: string}) => {
      void handleDeepLink(event.url);
    };
    const subscription = Linking.addEventListener('url', handler);
    return () => {
      subscription.remove();
    };
  },
};

export default linking;
