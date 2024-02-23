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
        label: "BANCA Login",
        icon: DataArrayIcon,
      },
      {
        label: "BANCA Login",
        icon: DataArrayIcon,
      },
    ],
  },
  {
    label: "Client User Management",
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
