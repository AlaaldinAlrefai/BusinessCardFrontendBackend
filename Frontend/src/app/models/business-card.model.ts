

  // src/app/models/business-card.model.ts
export interface BusinessCard {
    id: number;
    name: string;
    gender: string; // Added gender
    dateOfBirth?: Date | null; // Added date of birth, optional
    email: string;
    phone: string;
    address: string;
    photo?: string; // Optional for photo URL
    notes?: string; // Optional for additional notes
    qrCode?: string; // Optional for QR code data
    userId:2
}




  export interface businessCard {
    id: number;
    name: string;
    gender: string; // Added gender
    dateOfBirth?: Date | null; // Added date of birth, optional
    email: string;
    phone: string;
    address: string;
    photo?: string; // Optional for photo URL
    notes?: string; // Optional for additional notes
    userId:2
}