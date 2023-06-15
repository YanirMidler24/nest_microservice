/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateRefreshToken(userId: string): string {
    const payload = { sub: userId };

    // Generate the refresh token using the JwtService
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // Set the expiration time for the refresh token
    });

    // Store the refresh token or perform any other necessary operations

    return refreshToken;
  }
}
