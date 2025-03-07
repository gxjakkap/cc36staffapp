export const StaffRoles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  //
  REGIS: "regis",
  ACADEMIC: "academic",
  STAFF: "staff",
} as const;

export type StaffRoleKeys = (typeof StaffRoles)[keyof typeof StaffRoles];
