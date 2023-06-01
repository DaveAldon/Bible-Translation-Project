import { google } from 'googleapis'
import dotenv from 'dotenv'
import { Bible } from '../../types/tree'

dotenv.config()

export const getTreeData = async (): Promise<Bible[]> => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Bibles', // sheet name
    })

    const rows = response.data.values
    if (rows && rows.length) {
      return rows.slice(1).map((row: any[]) => ({
        id: row[0],
        title: row[1],
        parents: row[2],
        spectrum: row[3],
        denomination: row[4],
        description: row[5],
        image: row[6],
        year: row[7],
        acronym: row[8],
        category: row[9],
        filter: row[10],
        link: row[11],
        authors: row[12],
        source: row[13],
        copies: row[14],
      }))
    }
  } catch (err) {
    console.log(err)
  }
  return []
}
