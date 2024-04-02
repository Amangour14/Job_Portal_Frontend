import { User } from "./FormSubmission"
export function saveUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  export function getUser(): User | undefined {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : undefined;
  }
  
  export function removeUser(): void {
    localStorage.removeItem("user");
  }