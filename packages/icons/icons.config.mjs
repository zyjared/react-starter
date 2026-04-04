/**
 * Icon configuration — single source of truth
 *
 * Format:
 *   'collection:icon-name'          — component name derived from icon name (PascalCase + Icon)
 *   { ComponentName: 'collection:icon-name' }  — explicit component name
 *
 * Example:
 *   'lucide:search'                 → SearchIcon
 *   'material-symbols:close-rounded' → CloseRoundedIcon
 *   { TrashIcon: 'lucide:trash-2' } → TrashIcon
 */

/** @type {Array<string | Record<string, string>>} */
export default [
  {
    // Actions
    SearchIcon: "lucide:search",
    AddIcon: "lucide:plus",
    EditIcon: "lucide:pencil",
    DeleteIcon: "lucide:trash-2",
    SaveIcon: "lucide:save",
    CopyIcon: "lucide:copy",
    RefreshIcon: "lucide:refresh-cw",
    FilterIcon: "lucide:filter",
    SortIcon: "lucide:arrow-up-down",
    MoreIcon: "lucide:ellipsis",
    SettingsIcon: "lucide:settings",
    ShareIcon: "lucide:share-2",

    // Navigation
    HomeIcon: "lucide:house",
    MenuIcon: "lucide:menu",
    CloseIcon: "lucide:x",
    BackIcon: "lucide:arrow-left",
    ForwardIcon: "lucide:arrow-right",
    ChevronUpIcon: "lucide:chevron-up",
    ChevronDownIcon: "lucide:chevron-down",
    ChevronLeftIcon: "lucide:chevron-left",
    ChevronRightIcon: "lucide:chevron-right",
    ExternalIcon: "lucide:external-link",

    // Status
    CheckIcon: "lucide:check",
    WarningIcon: "lucide:triangle-alert",
    ErrorIcon: "lucide:circle-x",
    InfoIcon: "lucide:info",
    LoadingIcon: "lucide:loader",
    SuccessIcon: "lucide:circle-check",

    // User
    UserIcon: "lucide:user",
    UsersIcon: "lucide:users",
    LockIcon: "lucide:lock",
    UnlockIcon: "lucide:lock-open",
    LogoutIcon: "lucide:log-out",

    // Content
    FileIcon: "lucide:file",
    FolderIcon: "lucide:folder",
    ImageIcon: "lucide:image",
    LinkIcon: "lucide:link",
    CalendarIcon: "lucide:calendar",
    ClockIcon: "lucide:clock",
    BellIcon: "lucide:bell",
    MailIcon: "lucide:mail",
    StarIcon: "lucide:star",

    // Theme / misc
    SunIcon: "lucide:sun",
    MoonIcon: "lucide:moon",
    EyeIcon: "lucide:eye",
    EyeOffIcon: "lucide:eye-off",
    DragIcon: "lucide:grip-vertical",
  },
];
