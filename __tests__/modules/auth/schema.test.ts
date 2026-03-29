import { describe, it, expect } from "vitest";
import {
  signUpValidation,
  signInValidation,
  verifyOtpValidation,
} from "../../../src/modules/auth/schema";

describe("Auth Validations", () => {
  describe("signUpValidation", () => {
    it("should validate correct sign-up data", () => {
      const validData = {
        email: "test@example.com",
        password: "Password1",
        confirmPassword: "Password1",
      };
      expect(() => signUpValidation.parse(validData)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "not-an-email",
        password: "Password1",
        confirmPassword: "Password1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject short password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Pass1",
        confirmPassword: "Pass1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject password without uppercase", () => {
      const invalidData = {
        email: "test@example.com",
        password: "password1",
        confirmPassword: "password1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject password without lowercase", () => {
      const invalidData = {
        email: "test@example.com",
        password: "PASSWORD1",
        confirmPassword: "PASSWORD1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject password without number", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password",
        confirmPassword: "Password",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password1",
        confirmPassword: "Different1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });

    it("should reject empty email", () => {
      const invalidData = {
        email: "",
        password: "Password1",
        confirmPassword: "Password1",
      };
      expect(() => signUpValidation.parse(invalidData)).toThrow();
    });
  });

  describe("signInValidation", () => {
    it("should validate correct sign-in data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };
      expect(() => signInValidation.parse(validData)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "not-an-email",
        password: "password123",
      };
      expect(() => signInValidation.parse(invalidData)).toThrow();
    });

    it("should reject empty email", () => {
      const invalidData = {
        email: "",
        password: "password123",
      };
      expect(() => signInValidation.parse(invalidData)).toThrow();
    });

    it("should reject empty password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "",
      };
      expect(() => signInValidation.parse(invalidData)).toThrow();
    });
  });

  describe("verifyOtpValidation", () => {
    it("should validate correct OTP data", () => {
      const validData = {
        email: "test@example.com",
        code: "123456",
      };
      expect(() => verifyOtpValidation.parse(validData)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "not-an-email",
        code: "123456",
      };
      expect(() => verifyOtpValidation.parse(invalidData)).toThrow();
    });

    it("should reject wrong length code", () => {
      const invalidData = {
        email: "test@example.com",
        code: "12345",
      };
      expect(() => verifyOtpValidation.parse(invalidData)).toThrow();
    });

    it("should reject empty email", () => {
      const invalidData = {
        email: "",
        code: "123456",
      };
      expect(() => verifyOtpValidation.parse(invalidData)).toThrow();
    });

    it("should reject empty code", () => {
      const invalidData = {
        email: "test@example.com",
        code: "",
      };
      expect(() => verifyOtpValidation.parse(invalidData)).toThrow();
    });
  });
});
