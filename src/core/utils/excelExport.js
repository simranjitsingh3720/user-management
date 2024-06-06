import * as XLSX from 'xlsx';

const excelExport = (data) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert the filtered JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Write the workbook to a binary string
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Convert the binary string to an array buffer
  const buf = new ArrayBuffer(wbout.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < wbout.length; i++) {
    view[i] = wbout.charCodeAt(i) & 0xff;
  }

  // Create a blob from the array buffer
  const blob = new Blob([buf], { type: "application/octet-stream" });

  // Create a link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.xlsx";

  // Append the link to the body
  document.body.appendChild(link);

  // Simulate a click on the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export default excelExport;
