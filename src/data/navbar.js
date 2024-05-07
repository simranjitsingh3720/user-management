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
    label: "BANCA Login",
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
