export const StaffRoles = {
  ADMIN: "admin",
  //
  REGIS: "regis",
  ACADEMIC: "ACADEMIC",
  STAFF: "staff",
} as const;

export type StaffRoleKeys = (typeof StaffRoles)[keyof typeof StaffRoles];
