import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  public apiUrl = 'https://localhost:7231/api/Auth'; 


  private readonly USER_ID_KEY = 'user_id';
  private userId: number = 0;
  private role: string = '';

  constructor(private http: HttpClient) {
    const storedUserId = localStorage.getItem(this.USER_ID_KEY);
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
  }

  setUserId(userId: number): void {
    this.userId = userId;
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  getUserId(): number {
    return this.userId;
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return this.role;
  }

  clearUserId(): void {
    this.userId = 0;
    localStorage.removeItem(this.USER_ID_KEY);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  Userlogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/LoginUser`, { email, password });
  }

  register(userRegisterDto: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterUser`, userRegisterDto);
  }

  updateUser(id: number, userDto: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, userDto);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    this.clearUserId();
    localStorage.removeItem('jwtToken');
  }

  public decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  }
  isAdmin(): boolean {
    const userRole = this.getRole();
    return userRole === 'Admin'; // Adjust according to your actual role structure
  }

  isUser(): boolean {
    const userRole = this.getRole();
    return userRole === 'User'; // Adjust according to your actual role structure
  }
}
