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
        description: row[3],
        image: row[4],
        year: row[5],
        acronym: row[6],
        category: row[7],
        filter: row[8],
        link: row[9],
        authors: row[10],
        source: row[11],
        copies: row[12],
      }))
    }
  } catch (err) {
    console.log(err)
  }
  return []
}
