import { ApiResponse, Auth } from "@/types";
import { serverRequests } from "./serverHttpService";

class AuthService {
  private readonly url = "/auth";
  getCurrentUser() {
    return serverRequests.get<ApiResponse<Auth>>(this.url);
  }
}

const authService = new AuthService();

export default authService;
