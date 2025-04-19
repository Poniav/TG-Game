/**
 * Telegram WebApp API types
 * Based on https://core.telegram.org/bots/webapps
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export interface TelegramWebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebAppChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  photo_url?: string;
}

export interface TelegramWebAppInitData {
  query_id?: string;
  user?: TelegramWebAppUser;
  receiver?: TelegramWebAppUser;
  chat?: TelegramWebAppChat;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

export interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
  bottom_bar_bg_color?: string;
}

export interface TelegramWebAppSafeAreaInset {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// BackButton
export interface BackButton {
  isVisible: boolean;
  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
  show(): BackButton;
  hide(): BackButton;
}

// MainButton
export interface MainButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
  has_shine_effect?: boolean;
}

export interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  hasShineEffect: boolean;

  setText(text: string): MainButton;
  onClick(callback: () => void): MainButton;
  offClick(callback: () => void): MainButton;
  show(): MainButton;
  hide(): MainButton;
  enable(): MainButton;
  disable(): MainButton;
  showProgress(leaveActive?: boolean): MainButton;
  hideProgress(): MainButton;
  setParams(params: MainButtonParams): MainButton;
}

// SecondaryButton
export interface SecondaryButtonParams extends MainButtonParams {
  position?: "left" | "right" | "top" | "bottom";
}

export interface SecondaryButton extends MainButton {
  position: string;
  setParams(params: SecondaryButtonParams): SecondaryButton;
}

// SettingsButton
export interface SettingsButton {
  isVisible: boolean;
  onClick(callback: () => void): SettingsButton;
  offClick(callback: () => void): SettingsButton;
  show(): SettingsButton;
  hide(): SettingsButton;
}

// HapticFeedback
export interface HapticFeedback {
  impactOccurred(
    style: "light" | "medium" | "heavy" | "rigid" | "soft"
  ): HapticFeedback;
  notificationOccurred(type: "error" | "success" | "warning"): HapticFeedback;
  selectionChanged(): HapticFeedback;
}

// CloudStorage
export interface CloudStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): CloudStorage;
  getItem(
    key: string,
    callback?: (error: Error | null, value: string | null) => void
  ): CloudStorage;
  getItems(
    keys: string[],
    callback?: (error: Error | null, values: Record<string, string>) => void
  ): CloudStorage;
  removeItem(
    key: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): CloudStorage;
  removeItems(
    keys: string[],
    callback?: (error: Error | null, result: boolean | null) => void
  ): CloudStorage;
  getKeys(
    callback?: (error: Error | null, keys: string[]) => void
  ): CloudStorage;
}

// DeviceStorage
export interface DeviceStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): DeviceStorage;
  getItem(
    key: string,
    callback?: (error: Error | null, value: string | null) => void
  ): DeviceStorage;
  removeItem(
    key: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): DeviceStorage;
  clear(
    callback?: (error: Error | null, result: boolean | null) => void
  ): DeviceStorage;
}

// SecureStorage
export interface SecureStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): SecureStorage;
  getItem(
    key: string,
    callback?: (
      error: Error | null,
      value: string | null,
      can_restore?: boolean
    ) => void
  ): SecureStorage;
  restoreItem(
    key: string,
    callback?: (error: Error | null, value: string | null) => void
  ): SecureStorage;
  removeItem(
    key: string,
    callback?: (error: Error | null, result: boolean | null) => void
  ): SecureStorage;
  clear(
    callback?: (error: Error | null, result: boolean | null) => void
  ): SecureStorage;
}

// BiometricManager
export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: string;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;

  init(callback?: () => void): BiometricManager;
  requestAccess(
    params: { reason?: string },
    callback?: (is_granted: boolean) => void
  ): BiometricManager;
  authenticate(
    params: { reason?: string },
    callback?: (is_authenticated: boolean, token?: string) => void
  ): BiometricManager;
  updateBiometricToken(
    token: string,
    callback?: (is_updated: boolean) => void
  ): BiometricManager;
  openSettings(): BiometricManager;
}

// Accelerometer
export interface Accelerometer {
  isStarted: boolean;
  x: number | null;
  y: number | null;
  z: number | null;

  start(
    params?: { refresh_rate?: number },
    callback?: (success: boolean) => void
  ): Accelerometer;
  stop(callback?: (success: boolean) => void): Accelerometer;
}

// DeviceOrientation
export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;

  start(
    params?: { refresh_rate?: number; need_absolute?: boolean },
    callback?: (success: boolean) => void
  ): DeviceOrientation;
  stop(callback?: (success: boolean) => void): DeviceOrientation;
}

// Gyroscope
export interface Gyroscope {
  isStarted: boolean;
  x: number | null;
  y: number | null;
  z: number | null;

  start(
    params?: { refresh_rate?: number },
    callback?: (success: boolean) => void
  ): Gyroscope;
  stop(callback?: (success: boolean) => void): Gyroscope;
}

// LocationManager
export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;

  init(callback?: () => void): LocationManager;
  getLocation(
    callback: (
      locationData: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        course: number | null;
        speed: number | null;
        horizontal_accuracy: number | null;
        vertical_accuracy: number | null;
        course_accuracy: number | null;
        speed_accuracy: number | null;
      } | null
    ) => void
  ): LocationManager;
  openSettings(): LocationManager;
}

// Main WebApp interface
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramWebAppInitData;
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  safeAreaInset: TelegramWebAppSafeAreaInset;
  contentSafeAreaInset: TelegramWebAppSafeAreaInset;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  isActive: boolean;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;

  BackButton: BackButton;
  MainButton: MainButton;
  SecondaryButton: SecondaryButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  DeviceStorage: DeviceStorage;
  SecureStorage: SecureStorage;
  BiometricManager: BiometricManager;
  Accelerometer: Accelerometer;
  DeviceOrientation: DeviceOrientation;
  Gyroscope: Gyroscope;
  LocationManager: LocationManager;

  isVersionAtLeast(version: string): boolean;
  setHeaderColor(color_key: string): void;
  setBackgroundColor(color: string): void;
  setBottomBarColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  lockOrientation(): void;
  unlockOrientation(): void;
  requestFullscreen(): void;
  exitFullscreen(): void;
  addToHomeScreen(): void;
  checkHomeScreenStatus(
    callback?: (status: "added" | "not_added" | "unknown") => void
  ): void;
  onEvent(eventType: string, callback: (...args: any[]) => void): void;
  offEvent(eventType: string, callback: (...args: any[]) => void): void;
  sendData(data: string): void;
  switchInlineQuery(
    query: string,
    choose_chat_types?: Array<"users" | "bots" | "groups" | "channels">
  ): void;
  openLink(
    url: string,
    options?: { try_instant_view?: boolean; try_browser?: boolean }
  ): void;
  openTelegramLink(url: string, options?: { force_request?: boolean }): void;
  openInvoice(
    url: string,
    callback?: (status: "paid" | "cancelled" | "failed" | "pending") => void
  ): void;
  showPopup(
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id?: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text?: string;
      }>;
    },
    callback?: (button_id: string | null) => void
  ): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(
    params: { text?: string },
    callback?: (data: string | null) => boolean | void
  ): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (data: string | null) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (sent: boolean, webViewEvent: any) => void): void;
  downloadFile(
    params: { url: string; file_name: string },
    callback?: (downloading: boolean) => void
  ): void;
  shareToStory(
    media_url: string,
    params?: { text?: string; widget_link?: { url: string; name?: string } }
  ): void;
  shareMessage(msg_id: string, callback?: (shared: boolean) => void): void;
  setEmojiStatus(
    custom_emoji_id: string,
    params?: { duration?: number },
    callback?: (success: boolean) => void
  ): void;
  requestEmojiStatusAccess(callback?: (allowed: boolean) => void): void;
  invokeCustomMethod(
    method: string,
    params?: any,
    callback?: (error: Error | null, result: any) => void
  ): void;
  ready(): void;
  expand(): void;
  close(options?: { return_back?: boolean }): void;
}

export default TelegramWebApp;
