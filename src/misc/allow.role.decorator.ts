import { SetMetadata } from "@nestjs/common";

export const AllowToRoles = (...roles: ("administrator" | "professor" | "student")[]) => {
    return SetMetadata("allowedRoles", roles);
};