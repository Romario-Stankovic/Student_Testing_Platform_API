import { SetMetadata } from "@nestjs/common";

export const AllowedRoles = (...roles: ("administrator" | "professor" | "student")[]) => {
    return SetMetadata("allowedRoles", roles);
};