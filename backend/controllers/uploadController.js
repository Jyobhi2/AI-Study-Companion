
const pdfParse = require("pdf-parse");
const fs = require("fs");
const Document = require("../models/document");

const uploadPDF = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded"
      });

    }

    // Delete all previously uploaded PDFs
    await Document.deleteMany({});

    const dataBuffer =
      fs.readFileSync(req.file.path);

    const pdfData =
      await pdfParse(dataBuffer);

    await Document.create({
      content: pdfData.text
    });

    // Delete uploaded file from uploads folder
    fs.unlinkSync(req.file.path);

    res.json({
      message:
        "PDF Saved Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  uploadPDF
};
