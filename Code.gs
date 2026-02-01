/**
 * E-SPP Google Apps Script Backend
 * Spreadsheet ID: 1z-qE8ClDV8Oo_9KNsEqxH3i3gphkBhufNvcAH-gQvBo
 */

const SPREADSHEET_ID = '1z-qE8ClDV8Oo_9KNsEqxH3i3gphkBhufNvcAH-gQvBo';

// Konfigurasi Schema Database
const SCHEMAS = [
    { name: 'Users', headers: ['Username', 'Password', 'Role', 'Nama_Lengkap'] },
    { name: 'Data_Siswa', headers: ['NIS', 'NISN', 'Nama', 'No_WA', 'Kelas_X', 'Kelas_XI', 'Kelas_XII', 'Nominal_SPP', 'Nominal_DU_XI', 'Nominal_DU_XII', 'Status', 'Tahun_Masuk'] }, 
    { name: 'Pemasukan', headers: ['ID', 'Tanggal', 'NIS', 'Nama_Siswa', 'Kelas', 'Tahun_Ajaran', 'Bulan_Dibayar', 'Total_Bayar', 'Metode', 'Bukti', 'User_Input', 'Timestamp'] },
    { name: 'Pengeluaran', headers: ['ID', 'Tanggal', 'Kategori', 'Keterangan', 'Nominal', 'Bukti', 'User_Input', 'Timestamp'] },
    { name: 'Siswa_Keluar', headers: ['NIS', 'Nama', 'Tanggal_Keluar', 'Alasan', 'User_Input', 'Timestamp'] },
    { name: 'Config_TA', headers: ['ID', 'Tahun_Ajaran', 'Status'] } 
];

/**
 * Handle GET Requests (Read Data)
 */
function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const action = e.parameter.action;
    const sheetName = e.parameter.sheet;
    
    if (!action || !sheetName) {
       return responseJSON({ status: 'error', message: 'Missing parameters: action or sheet' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return responseJSON({ status: 'error', message: `Sheet '${sheetName}' not found` });
    }

    if (action === 'read') {
      const data = getSheetData(sheet);
      return responseJSON({ status: 'success', data: data });
    }

    return responseJSON({ status: 'error', message: 'Invalid action for GET' });

  } catch (error) {
    return responseJSON({ status: 'error', message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle POST Requests (Create/Update/Delete)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e.postData) {
      return responseJSON({ status: 'error', message: 'No post data' });
    }

    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    const sheetName = params.sheet;
    const payload = params.data;

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return responseJSON({ status: 'error', message: `Sheet '${sheetName}' not found` });
    }

    if (action === 'create') {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const newRow = [];
      
      // Map payload data to headers order
      headers.forEach(header => {
        // Add timestamp automatically if header is Timestamp
        if (header === 'Timestamp') {
          newRow.push(new Date().toISOString());
        } else {
          newRow.push(payload[header] || '');
        }
      });

      sheet.appendRow(newRow);
      return responseJSON({ status: 'success', message: 'Data created successfully' });
    }
    
    // Implement 'update' or 'delete' here if needed later

    return responseJSON({ status: 'error', message: 'Invalid action or not implemented' });

  } catch (error) {
    return responseJSON({ status: 'error', message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper: Convert Sheet Rows to JSON Array
 */
function getSheetData(sheet) {
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return []; // Only headers or empty

  const headers = rows[0];
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    let hasData = false;
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
      if (row[j]) hasData = true;
    }
    
    if (hasData) {
      data.push(obj);
    }
  }
  return data;
}

/**
 * Helper: Return JSON Response with CORS
 */
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * SETUP FUNCTION
 * Run this manually once to create sheets and headers
 */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  SCHEMAS.forEach(schema => {
    let sheet = ss.getSheetByName(schema.name);
    if (!sheet) {
      sheet = ss.insertSheet(schema.name);
      // Delete default columns/rows to clean up
      if (sheet.getMaxColumns() > 1) sheet.deleteColumns(2, sheet.getMaxColumns() - 1);
      if (sheet.getMaxRows() > 1) sheet.deleteRows(2, sheet.getMaxRows() - 1);
    }
    
    // Set Headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, schema.headers.length).setValues([schema.headers]);
      // Make headers bold
      sheet.getRange(1, 1, 1, schema.headers.length).setFontWeight('bold');
    }
  });
}