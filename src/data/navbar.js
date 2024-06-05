import GridViewIcon from "@mui/icons-material/GridView";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DataArrayIcon from "@mui/icons-material/DataArray";

export const SideNavData = [
  {
    label: "Dashboard",
    icon: GridViewIcon,
  },
  {
    label: "User Management",
    icon: ManageAccountsIcon,
    navigateRoute: "user-management",
  },
  {
    label: "Permission",
    icon: ManageAccountsIcon,
    navigateRoute: "permission",
  },
  {
    label: "Group",
    icon: ManageAccountsIcon,
    navigateRoute: "group",
  },
  {
    label: "Roles",
    icon: ManageAccountsIcon,
    navigateRoute: "roles",
  },
  {
    label: "LOB",
    icon: ManageAccountsIcon,
    navigateRoute: "lob",
  },
  {
    label: "Product",
    icon: ManageAccountsIcon,
    navigateRoute: "product",
  },
  {
    label: "Banca Login",
    icon: GridViewIcon,
    navigateRoute: "banca",
  },
  {
    label: "Proposal Bitly Link Configuration",
    icon: GridViewIcon,
    navigateRoute: "proposal-bitly-config",
  },
  {
    label: "Set OTP Exception",
    icon: GridViewIcon,
    navigateRoute: "otpException",
  },
  {
    label: "Proposal OTP Exception",
    icon: GridViewIcon,
    navigateRoute: "proposalOtpException",
  },
  {
    label: "Producer EOD Lock ByPass list",
    icon: GridViewIcon,
    navigateRoute: "producer-eod-bypass-list",
  },
  {
    label: "Product Wise Payment Configuration",
    icon: GridViewIcon,
    navigateRoute: "product-payment-config",
  },
  {
    label: "House Bank Master",
    icon: GridViewIcon,
    navigateRoute: "house-bank-master",
  },
  {
    label: "Health Configuration",
    icon: GridViewIcon,
    navigateRoute: "health-config",
  },
  {
    label: "Employee Flag Configuration",
    icon: GridViewIcon,
    navigateRoute: "employee-flag-config",
  },
  {
    label: "Synced Producers",
    icon: GridViewIcon,
    navigateRoute: "gc-sync-updation",
  },
  {
    label: "Producer Management",
    icon: ManageAccountsIcon,
  },
  {
    label: "Data Entry User",
    icon: DataArrayIcon,
    child: [
      {
        label: "BANCA Login-1",
        icon: DataArrayIcon,
      },
      {
        label: "BANCA Login-2",
        icon: DataArrayIcon,
      },
    ],
  },
  {
    label: "Client UserManagement",
    icon: GridViewIcon,
  },

  {
    label: "Masters",
    icon: GridViewIcon,
  },
  {
    label: "Privilege",
    icon: GridViewIcon,
  },
  {
    label: "Marine Management",
    icon: GridViewIcon,
  },
  {
    label: "GC Data",
    icon: GridViewIcon,
  },
];
