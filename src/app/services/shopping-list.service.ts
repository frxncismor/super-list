import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private apiKey = 'TU_API_KEY'; // Reemplaza con tu API key
  private spreadsheetId = 'ID_DE_LA_HOJA'; // Reemplaza con el ID de tu hoja de Google Sheets
  private interval: any;
  private updateInterval = 5000; // Intervalo de actualización en milisegundos (ejemplo: cada 5 segundos)
  private discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
  private scopes = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  public startDataUpdate(range: string): void {
    this.getSheetData(range); // Obtiene los datos iniciales al iniciar la actualización

    this.interval = setInterval(() => {
      this.getSheetData(range); // Obtiene los datos actualizados en cada intervalo
    }, this.updateInterval);
  }

  public stopDataUpdate(): void {
    clearInterval(this.interval);
  }

  public async getSheetData(range: string): Promise<any[][]> {
    await this.loadGapi();
    await this.initClient();

    return await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: range
    }).then((response: any) => {
      return response.result.values;
    }).catch((error: any) => {
      console.error('Error getting sheet data:', error);
      return [];
    });
  }

  private async loadGapi() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';

      script.onload = () => {
        gapi.load('client', resolve);
      };

      script.onerror = reject;

      document.body.appendChild(script);
    });
  }

  private async initClient() {
    return new Promise((resolve, reject) => {
      gapi.client.init({
        apiKey: this.apiKey,
        discoveryDocs: this.discoveryDocs,
        clientId: 'YOUR_CLIENT_ID', // Reemplaza con tu Client ID (si es necesario)
        scope: this.scopes
      }).then(resolve)
        .catch(reject);
    });
  }

}
