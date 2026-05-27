export declare class Host {
    id: number;
    name: string;
    email: string;
    number: string;
    password: string;
    designation: string;
    department: string;
    validatePassword(password: string): Promise<boolean>;
    checkInTime: Date;
    checkOutTime: Date;
}
