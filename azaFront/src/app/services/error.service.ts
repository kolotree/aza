import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    public handleErrorMessage(error: HttpErrorResponse): string {
        if (error && error.error) { return error.error; }
        if (error && error.message) { return error.message; }
        return 'Failed to process file';
    }
}
