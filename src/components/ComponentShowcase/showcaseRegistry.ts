/**
 * Showcase registry maps component ids to their example/demo modules.
 * Usage: import { showcaseRegistry } from './showcaseRegistry';
 * Then: const Demo = showcaseRegistry['button'];
 */
import { ButtonExample } from '../Button/Button.example';
import { InputExample } from '../Input/Input.example';
import { TextareaExample } from '../Textarea/Textarea.example';
import { CheckboxExample } from '../Checkbox/Checkbox.example';
import { SwitchExample } from '../Switch/Switch.example';
import { CardExample } from '../Card/Card.example';
import { BadgeExample } from '../Badge/Badge.example';
import { AvatarExample } from '../Avatar/Avatar.example';
import { AlertExample } from '../Alert/Alert.example';
import { ToastExample } from '../Toast/Toast.example';
import { ModalExample } from '../Modal/Modal.example';
import { SpinnerExample } from '../Spinner/Spinner.example';
import { SkeletonExample } from '../Skeleton/Skeleton.example';
import { StatsCardExample } from '../StatsCard/StatsCard.example';
import { TabsExample } from '../Tabs/Tabs.example';
import { SidebarExample } from '../Sidebar/Sidebar.example';
import { NavbarExample } from '../Navbar/Navbar.example';
import { DashboardLayoutExample } from '../DashboardLayout/DashboardLayout.example';
import { DashboardHeaderExample } from '../DashboardHeader/DashboardHeader.example';
import { DashboardGridExample } from '../DashboardGrid/DashboardGrid.example';
import { DataTableShowcase } from '../DataTable/DataTableShowcase';
import { AuthShowcase } from '../Auth/AuthShowcase';
import { LoginFormExample } from "../Auth/LoginForm.example";
import { SignupFormExample } from "../Auth/SignupForm.example";
import { ProtectedRouteExample } from "../Auth/ProtectedRoute.example";
import { PasswordResetFormExample } from "../Auth/PasswordResetForm.example";
import { PageLayoutShowcase } from '../PageLayout/PageLayoutShowcase';
import { ChatWidgetExample } from '../ChatWidget/ChatWidget.example';



export const showcaseRegistry: Record<string, React.FC> = {
  button: ButtonExample,
  input: InputExample,
  textarea: TextareaExample,
  checkbox: CheckboxExample,
  switch: SwitchExample,
  card: CardExample,
  badge: BadgeExample,
  avatar: AvatarExample,
  alert: AlertExample,
  toast: ToastExample,
  modal: ModalExample,
  spinner: SpinnerExample,
  skeleton: SkeletonExample,
  statscard: StatsCardExample,
  tabs: TabsExample,
  sidebar: SidebarExample,
  navbar: NavbarExample,
  "dashboard-layout": DashboardLayoutExample,
  "dashboard-header": DashboardHeaderExample,
  "dashboard-grid": DashboardGridExample,
  datatable: DataTableShowcase,
  auth: AuthShowcase,
  login: LoginFormExample,
  signup: SignupFormExample,
  "password-reset": PasswordResetFormExample,
  shield: ProtectedRouteExample,
  "page-layout": PageLayoutShowcase,
  chatwidget: ChatWidgetExample
  // Extend with other demos as needed
};