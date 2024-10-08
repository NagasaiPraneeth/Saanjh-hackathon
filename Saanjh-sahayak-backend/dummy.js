/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "the below are  test reports of a person of various time periods . analyze all the test reports and give combined analysis by comparing all the test reports which are stored in the below list . give the analysis in single paragraph.\n\n[{\n  medicalQuery: 'yes',\n  date: '24/03/2019',\n  'Uric Acid': '4.0 mg/dL',\n  Urea: '16 mg/dL',\n  Creatinine: '0.5 mg/dL',\n  Sodium: '138 mmol/L',\n  Potassium: '5.0 mmol/L',\n  Chlorides: '101 mmol/L',\n  'Fasting Plasma Glucose': '201 mg/dL',\n  '2 hrs Post Lunch Plasma Glucose': '212 mg/dL',\n  Haemoglobin: '11.2 g/dL',\n  'Total RBC Count': '4.38 millions/cumm',\n  'Packed Cell Volume / Hematocrit': '34.2 Vol%',\n  MCV: '78.1 fl',\n  MCH: '25.7 pg',\n  MCHC: '32.9 gm/dL',\n  RDW: '16.8 %',\n  'Total WBC Count': '6400 Cells/cumm',\n  Neutrophils: '60 %',\n  Lymphocytes: '28 %',\n  Eosinophils: '2 %',\n  Monocytes: '9 %',\n  Basophils: '1 %',\n  'Absolute Neutrophil Count': '3900 Cells/cumm',\n  'Absolute Lymphocyte Count': '1800 Cells/cumm',\n  'Absolute Eosinophil Count': '100 Cells/cumm',\n  'Absolute Monocyte Count': '600 Cells/cumm',\n  'Platelet Count': '427000 /cumm',\n  RBC: 'Normocytic Normochromic with mild anisocytosis',\n  WBC: 'Normal in morphology,maturity and distribution',\n  Platelets: 'Adequate',\n  Colour: 'Pale Yellow',\n  Appearance: 'Clear',\n  'Specific Gravity': '1.010',\n  'Reaction/pH': 'Alkaline (7.5)',\n  Protein: 'Nil',\n  Glucose: 'Nil',\n  Urobilinogen: 'Normal',\n  Bilirubin: 'Negative',\n  Ketones: 'Negative',\n  Nitrites: 'Negative',\n  'Pus Cells': '1-2/HPF',\n  'R.B.C': 'Nil',\n  'Epithelial Cells': '1-2/HPF',\n  Casts: 'Nil',\n  Crystals: 'Nil',\n  'Serum Status': 'Clear',\n  Triglycerides: '212 mg/dL',\n  'Total Cholesterol': '161 mg/dL',\n  'LDL Cholesterol': '83 mg/dL',\n  'HDL Cholesterol': '36 mg/dL',\n  VLDL: '42 mg/dL',\n  'Total Cholesterol/HDL Cholesterol Ratio': '4.47',\n  'LDL Cholesterol/HDL Cholesterol Ratio': '2.29',\n  'Glycosylated Haemoglobin': '8.3 %'\n},\n{\n  \"medicalQuery\": \"yes\",\n  \"date\": \"24/04/2019\",\n  \"Uric Acid\": \"4.2 mg/dL\",\n  \"Urea\": \"17 mg/dL\",\n  \"Creatinine\": \"0.6 mg/dL\",\n  \"Sodium\": \"137 mmol/L\",\n  \"Potassium\": \"5.1 mmol/L\",\n  \"Chlorides\": \"102 mmol/L\",\n  \"Fasting Plasma Glucose\": \"205 mg/dL\",\n  \"2 hrs Post Lunch Plasma Glucose\": \"220 mg/dL\",\n  \"Haemoglobin\": \"11.0 g/dL\",\n  \"Total RBC Count\": \"4.35 millions/cumm\",\n  \"Packed Cell Volume / Hematocrit\": \"34.0 Vol%\",\n  \"MCV\": \"78.3 fl\",\n  \"MCH\": \"25.6 pg\",\n  \"MCHC\": \"32.8 gm/dL\",\n  \"RDW\": \"16.9 %\",\n  \"Total WBC Count\": \"6500 Cells/cumm\",\n  \"Neutrophils\": \"61 %\",\n  \"Lymphocytes\": \"27 %\",\n  \"Eosinophils\": \"2 %\",\n  \"Monocytes\": \"9 %\",\n  \"Basophils\": \"1 %\",\n  \"Absolute Neutrophil Count\": \"4000 Cells/cumm\",\n  \"Absolute Lymphocyte Count\": \"1750 Cells/cumm\",\n  \"Absolute Eosinophil Count\": \"100 Cells/cumm\",\n  \"Absolute Monocyte Count\": \"600 Cells/cumm\",\n  \"Platelet Count\": \"430000 /cumm\",\n  \"RBC\": \"Normocytic Normochromic with mild anisocytosis\",\n  \"WBC\": \"Normal in morphology,maturity and distribution\",\n  \"Platelets\": \"Adequate\",\n  \"Colour\": \"Pale Yellow\",\n  \"Appearance\": \"Clear\",\n  \"Specific Gravity\": \"1.012\",\n  \"Reaction/pH\": \"Alkaline (7.5)\",\n  \"Protein\": \"Nil\",\n  \"Glucose\": \"Nil\",\n  \"Urobilinogen\": \"Normal\",\n  \"Bilirubin\": \"Negative\",\n  \"Ketones\": \"Negative\",\n  \"Nitrites\": \"Negative\",\n  \"Pus Cells\": \"1-2/HPF\",\n  \"R.B.C\": \"Nil\",\n  \"Epithelial Cells\": \"1-2/HPF\",\n  \"Casts\": \"Nil\",\n  \"Crystals\": \"Nil\",\n  \"Serum Status\": \"Clear\",\n  \"Triglycerides\": \"215 mg/dL\",\n  \"Total Cholesterol\": \"165 mg/dL\",\n  \"LDL Cholesterol\": \"85 mg/dL\",\n  \"HDL Cholesterol\": \"35 mg/dL\",\n  \"VLDL\": \"43 mg/dL\",\n  \"Total Cholesterol/HDL Cholesterol Ratio\": \"4.5\",\n  \"LDL Cholesterol/HDL Cholesterol Ratio\": \"2.3\",\n  \"Glycosylated Haemoglobin\": \"8.5 %\"\n},\n{\n  \"medicalQuery\": \"yes\",\n  \"date\": \"24/05/2019\",\n  \"Uric Acid\": \"4.0 mg/dL\",\n  \"Urea\": \"18 mg/dL\",\n  \"Creatinine\": \"0.6 mg/dL\",\n  \"Sodium\": \"133 mmol/L\",\n  \"Potassium\": \"5.0 mmol/L\",\n  \"Chlorides\": \"100 mmol/L\",\n  \"Fasting Plasma Glucose\": \"202 mg/dL\",\n  \"2 hrs Post Lunch Plasma Glucose\": \"222 mg/dL\",\n  \"Haemoglobin\": \"11.0 g/dL\",\n  \"Total RBC Count\": \"4.39 millions/cumm\",\n  \"Packed Cell Volume / Hematocrit\": \"34.0 Vol%\",\n  \"MCV\": \"75.3 fl\",\n  \"MCH\": \"25.6 pg\",\n  \"MCHC\": \"33.8 gm/dL\",\n  \"RDW\": \"17.9 %\",\n  \"Total WBC Count\": \"6600 Cells/cumm\",\n  \"Neutrophils\": \"60 %\",\n  \"Lymphocytes\": \"27 %\",\n  \"Eosinophils\": \"2 %\",\n  \"Monocytes\": \"9 %\",\n  \"Basophils\": \"1 %\",\n  \"Absolute Neutrophil Count\": \"4000 Cells/cumm\",\n  \"Absolute Lymphocyte Count\": \"1500 Cells/cumm\",\n  \"Absolute Eosinophil Count\": \"100 Cells/cumm\",\n  \"Absolute Monocyte Count\": \"600 Cells/cumm\",\n  \"Platelet Count\": \"430000 /cumm\",\n  \"RBC\": \"Normocytic Normochromic with mild anisocytosis\",\n  \"WBC\": \"Normal in morphology,maturity and distribution\",\n  \"Platelets\": \"Adequate\",\n  \"Colour\": \"Pale Yellow\",\n  \"Appearance\": \"Clear\",\n  \"Specific Gravity\": \"1.012\",\n  \"Reaction/pH\": \"Alkaline (7.5)\",\n  \"Protein\": \"Nil\",\n  \"Glucose\": \"Nil\",\n  \"Urobilinogen\": \"Normal\",\n  \"Bilirubin\": \"Negative\",\n  \"Ketones\": \"Negative\",\n  \"Nitrites\": \"Negative\",\n  \"Pus Cells\": \"1-2/HPF\",\n  \"R.B.C\": \"Nil\",\n  \"Epithelial Cells\": \"1-2/HPF\",\n  \"Casts\": \"Nil\",\n  \"Crystals\": \"Nil\",\n  \"Serum Status\": \"Clear\",\n  \"Triglycerides\": \"215 mg/dL\",\n  \"Total Cholesterol\": \"165 mg/dL\",\n  \"LDL Cholesterol\": \"85 mg/dL\",\n  \"HDL Cholesterol\": \"35 mg/dL\",\n  \"VLDL\": \"43 mg/dL\",\n  \"Total Cholesterol/HDL Cholesterol Ratio\": \"4.5\",\n  \"LDL Cholesterol/HDL Cholesterol Ratio\": \"2.3\",\n  \"Glycosylated Haemoglobin\": \"8.1 %\"\n}\n\n]"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Over the three-month period, the patient's test results show a trend of consistently high glucose levels, indicating poorly controlled diabetes. While HbA1c levels fluctuate slightly, they remain elevated, suggesting persistent hyperglycemia. Lipid profile reveals borderline high triglycerides and total cholesterol, with LDL cholesterol slightly elevated and HDL cholesterol on the lower end, increasing cardiovascular risk. Kidney function remains stable, with normal urea and creatinine levels.  Mild anemia persists, with slightly low hemoglobin and hematocrit levels, but red blood cell indices suggest it's likely not due to iron deficiency.  White blood cell counts are within the normal range, and urinalysis shows no significant abnormalities. Overall, the patient's condition requires close monitoring and management, particularly focusing on glycemic control and cardiovascular risk factors. \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();