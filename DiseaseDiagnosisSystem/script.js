// Check if the browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

// Check if the browser supports speech synthesis (for text-to-speech)
const synth = window.speechSynthesis;

// Function to start voice input
function startVoiceInput() {
    if (!recognition) {
        alert("Sorry, your browser does not support voice recognition.");
        return;
    }

    recognition.start();

    // On receiving the result
    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        document.getElementById('symptoms').value = voiceInput;
    };

    // Error handling
    recognition.onerror = (event) => {
        alert('Voice input error: ' + event.error);
    };
}

// Function to speak text
function speak(text) {
    if (synth.speaking) {
        console.error('SpeechSynthesis is already speaking.');
        return;
    }

    if (text !== '') {
        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        };
        synth.speak(utterThis);
    }
}

const knowledgeBase = {
    // Symptom to disease mapping
    "fever": ["Flu", "COVID-19", "Malaria", "Dengue", "Typhoid"],
    "cough": ["Flu", "COVID-19", "Bronchitis", "Pneumonia", "Tuberculosis"],
    "nausea": ["Gastroenteritis", "Food Poisoning", "Pregnancy", "Stomach Ulcer", "Vertigo"],
    "headache": ["Migraine", "Tension Headache", "Cluster Headache", "Sinusitis", "Dehydration"],
    "vomiting": ["Gastroenteritis", "Food Poisoning", "Migraine", "Appendicitis", "Pregnancy"],
    "diarrhea": ["Gastroenteritis", "Food Poisoning", "IBS", "Cholera", "Crohn's Disease"],
    "fatigue": ["Anemia", "Thyroid Disorders", "Chronic Fatigue Syndrome", "Depression", "Diabetes"],
    "rash": ["Allergic Reaction", "Dermatitis", "Psoriasis", "Chickenpox", "Shingles"],
    "sore throat": ["Strep Throat", "Tonsillitis", "Pharyngitis", "Common Cold", "Laryngitis"],
    "abdominal pain": ["Appendicitis", "Gastroenteritis", "Ulcer", "Gallstones", "Pancreatitis"],
    "shortness of breath": ["Asthma", "COPD", "Heart Failure", "Pneumonia", "Anemia"],
    "joint pain": ["Arthritis", "Gout", "Bursitis", "Rheumatoid Arthritis", "Lupus"],
    "chest pain": ["Angina", "Heart Attack", "Pulmonary Embolism", "Costochondritis", "Pneumothorax"],
    "blurry vision": ["Cataracts", "Glaucoma", "Diabetic Retinopathy", "Macular Degeneration", "Myopia"],
    "itching": ["Allergic Reaction", "Eczema", "Psoriasis", "Scabies", "Liver Disease"],
    "muscle pain": ["Fibromyalgia", "Injury", "Tension", "Myopathy", "Influenza"],
    "weight loss": ["Hyperthyroidism", "Diabetes", "Cancer", "Malabsorption", "Chronic Infection"],
    "frequent urination": ["Diabetes", "Urinary Tract Infection", "Prostate Issues", "Overactive Bladder", "Cystitis"],
    "painful urination": ["Urinary Tract Infection", "Kidney Stones", "Cystitis", "Bladder Infection", "Prostatitis"],
    "jaundice": ["Liver Disease", "Hepatitis", "Pancreatitis", "Gallstones", "Hemolytic Anemia"],
    "swelling": ["Heart Failure", "Kidney Disease", "Liver Disease", "Deep Vein Thrombosis", "Lymphedema"],
    "night sweats": ["Tuberculosis", "Lymphoma", "Hyperthyroidism", "Infection", "Menopause"],
    "dizziness": ["Vertigo", "Anemia", "Dehydration", "Low Blood Pressure", "Hypoglycemia"],
    "heart palpitations": ["Anxiety", "Arrhythmia", "Hyperthyroidism", "Anemia", "Panic Disorder"],
    "loss of appetite": ["Depression", "Gastroenteritis", "Cancer", "Thyroid Disorders", "Chronic Infection"],
    "cold hands and feet": ["Raynaud's Disease", "Anemia", "Hypothyroidism", "Peripheral Artery Disease"],
    "tingling sensation": ["Diabetes", "Multiple Sclerosis", "Carpal Tunnel Syndrome", "Stroke"],
    "difficulty swallowing": ["Tonsillitis", "Esophagitis", "Gastroesophageal Reflux Disease (GERD)", "Laryngitis"],
    "constipation": ["IBS", "Hypothyroidism", "Dehydration", "Colon Cancer", "Medication Side Effects"],
    "blood in stool": ["Hemorrhoids", "Colon Cancer", "Ulcerative Colitis", "Crohn's Disease", "Diverticulosis"]
     // (other mappings omitted for brevity)
};

const tabletSuggestions = {
    // Disease to tablet suggestion mapping
    "Flu": ["Antipyretics", "Cough Syrup"],
    "COVID-19": ["Antiviral Medication", "Supportive Care"],
    "Malaria": ["Antimalarial Medication", "Supportive Care"],
    "Dengue": ["Supportive Care", "Pain Relievers"],
    "Typhoid": ["Antibiotics", "Hydration Solutions"],
    "Bronchitis": ["Cough Syrup", "Bronchodilators"],
    "Pneumonia": ["Antibiotics", "Supportive Care"],
    "Tuberculosis": ["Antibiotics", "Supportive Care"],
    "Gastroenteritis": ["Hydration Solutions", "Antiemetics"],
    "Food Poisoning": ["Antiemetics", "Hydration Solutions"],
    "Migraine": ["Pain Relievers", "Migraine Medication"],
    "IBS": ["Antispasmodics", "Laxatives"],
    "Cholera": ["Oral Rehydration Salts", "Antibiotics"],
    "Anemia": ["Iron Supplements", "Vitamin B12 Supplements"],
    "Depression": ["Antidepressants", "Therapy"],
    "Asthma": ["Bronchodilators", "Steroids"],
    "Heart Failure": ["ACE Inhibitors", "Beta Blockers"],
    "Diabetes": ["Insulin", "Metformin"],
    "Liver Disease": ["Antivirals", "Supportive Care"],
    "Lupus": ["Immunosuppressants", "Corticosteroids"],
    "Gallstones": ["Pain Relievers", "Surgery"],
    "Kidney Stones": ["Pain Relievers", "Hydration", "Surgery"],
    "Appendicitis": ["Surgery", "Pain Relievers"],
    "Vertigo": ["Antivert", "Antihistamines"],
    "Hypertension": ["ACE Inhibitors", "Beta Blockers", "Diuretics"],
    "Arrhythmia": ["Antiarrhythmic Drugs", "Beta Blockers"],
    "Raynaud's Disease": ["Calcium Channel Blockers", "Vasodilators"],
    "Hypothyroidism": ["Thyroid Hormone Replacement"],
    "Ulcerative Colitis": ["Anti-inflammatory Drugs", "Immune System Suppressors"]
    // (other mappings omitted for brevity)
};

const doctorSuggestions = {
    // Disease to specialist suggestion mapping
    "Flu": ["General Physician"],
    "COVID-19": ["Infectious Disease Specialist"],
    "Malaria": ["Infectious Disease Specialist"],
    "Dengue": ["Infectious Disease Specialist"],
    "Typhoid": ["Infectious Disease Specialist"],
    "Bronchitis": ["Pulmonologist"],
    "Pneumonia": ["Pulmonologist"],
    "Tuberculosis": ["Pulmonologist"],
    "Gastroenteritis": ["Gastroenterologist"],
    "Food Poisoning": ["Gastroenterologist"],
    "Migraine": ["Neurologist"],
    "IBS": ["Gastroenterologist"],
    "Cholera": ["Infectious Disease Specialist"],
    "Anemia": ["Hematologist"],
    "Depression": ["Psychiatrist"],
    "Asthma": ["Pulmonologist"],
    "Heart Failure": ["Cardiologist"],
    "Diabetes": ["Endocrinologist"],
    "Liver Disease": ["Hepatologist"],
    "Lupus": ["Rheumatologist"],
    "Gallstones": ["Gastroenterologist"],
    "Kidney Stones": ["Urologist"],
    "Appendicitis": ["General Surgeon"],
    "Vertigo": ["ENT Specialist", "Neurologist"],
    "Hypertension": ["Cardiologist"],
    "Arrhythmia": ["Cardiologist"],
    "Raynaud's Disease": ["Rheumatologist"],
    "Hypothyroidism": ["Endocrinologist"],
    "Ulcerative Colitis": ["Gastroenterologist"]
    // (other mappings omitted for brevity)
};

let diagnosisHistory = [];

// Diagnose function
function diagnose() {
    const userInput = document.getElementById('symptoms').value.trim();
    if (!userInput) {
        alert('Please enter symptoms before diagnosing.');
        return;
    }

    const symptoms = userInput.split(',').map(symptom => symptom.trim().toLowerCase());
    let possibleDiseases = new Set();

    symptoms.forEach(symptom => {
        if (knowledgeBase[symptom]) {
            knowledgeBase[symptom].forEach(disease => possibleDiseases.add(disease));
        }
    });

    const diseasesArray = Array.from(possibleDiseases);
    displayResults(diseasesArray, userInput);

    // Now, speak the diagnosis result
    let speakText = "Based on your symptoms, you might have the following diseases: " + diseasesArray.join(", ") + ". ";

    let tablets = new Set();
    let doctors = new Set();

    diseasesArray.forEach(disease => {
        if (tabletSuggestions[disease]) {
            tabletSuggestions[disease].forEach(tablet => tablets.add(tablet));
        }
        if (doctorSuggestions[disease]) {
            doctorSuggestions[disease].forEach(doctor => doctors.add(doctor));
        }
    });

    if (tablets.size > 0) {
        speakText += "The recommended tablets are: " + Array.from(tablets).join(", ") + ". ";
    }

    if (doctors.size > 0) {
        speakText += "The specialists you should consult are: " + Array.from(doctors).join(", ") + ".";
    }

    // Call the speak function to read the result aloud
    speak(speakText);
}

// Function to display the diagnosis results
function displayResults(diseases, symptoms) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    if (diseases.length === 0) {
        resultDiv.innerHTML = "No matching diseases found based on the symptoms provided.";
        return;
    }

    let results = `<strong>Based on your symptoms, you might have the following diseases:</strong><br>`;
    let tablets = new Set();
    let doctors = new Set();

    diseases.forEach(disease => {
        results += `${disease}<br>`;
        if (tabletSuggestions[disease]) {
            tabletSuggestions[disease].forEach(tablet => tablets.add(tablet));
        }
        if (doctorSuggestions[disease]) {
            doctorSuggestions[disease].forEach(doctor => doctors.add(doctor));
        }
    });

    results += `<br><strong>Recommended Tablets:</strong><br>`;
    tablets.forEach(tablet => {
        results += `${tablet}<br>`;
    });

    results += `<br><strong>Recommended Specialists:</strong><br>`;
    doctors.forEach(doctor => {
        results += `${doctor}<br>`;
    });

    resultDiv.innerHTML = results;

    diagnosisHistory.push({ symptoms, diseases });
    displayHistory();
}

// Function to display diagnosis history
function displayHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = "<strong>Previous Diagnoses:</strong><br>";

    diagnosisHistory.forEach((record, index) => {
        historyDiv.innerHTML += `<strong>${index + 1}. Symptoms:</strong> ${record.symptoms}<br>`;
        historyDiv.innerHTML += `<strong>Diseases:</strong> ${record.diseases.join(', ')}<br><br>`;
    });
}
