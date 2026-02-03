"use client"

import { useState, useEffect, useCallback } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search, X, Loader2, Brain } from "lucide-react"

// Comprehensive symptoms list from medical dataset
const SYMPTOMS_LIST = [
  "anxiety and nervousness", "depression", "shortness of breath", "depressive or psychotic symptoms",
  "sharp chest pain", "dizziness", "insomnia", "abnormal involuntary movements", "chest tightness",
  "palpitations", "irregular heartbeat", "breathing fast", "hoarse voice", "sore throat",
  "difficulty speaking", "cough", "nasal congestion", "throat swelling", "diminished hearing",
  "lump in throat", "throat feels tight", "difficulty in swallowing", "skin swelling",
  "retention of urine", "groin mass", "leg pain", "hip pain", "suprapubic pain",
  "blood in stool", "lack of growth", "emotional symptoms", "elbow weakness", "back weakness",
  "pus in sputum", "symptoms of the scrotum and testes", "swelling of scrotum",
  "pain in testicles", "flatulence", "pus draining from ear", "jaundice", "mass in scrotum",
  "white discharge from eye", "irritable infant", "abusing alcohol", "fainting",
  "hostile behavior", "drug abuse", "sharp abdominal pain", "feeling ill", "vomiting",
  "headache", "nausea", "diarrhea", "vaginal itching", "vaginal dryness", "painful urination",
  "involuntary urination", "pain during intercourse", "frequent urination", "lower abdominal pain",
  "vaginal discharge", "blood in urine", "hot flashes", "intermenstrual bleeding",
  "hand or finger pain", "wrist pain", "hand or finger swelling", "arm pain", "wrist swelling",
  "arm stiffness or tightness", "arm swelling", "hand or finger stiffness or tightness",
  "wrist stiffness or tightness", "lip swelling", "toothache", "abnormal appearing skin",
  "skin lesion", "acne or pimples", "dry lips", "facial pain", "mouth ulcer", "skin growth",
  "eye deviation", "diminished vision", "double vision", "cross-eyed", "symptoms of eye",
  "pain in eye", "eye moves abnormally", "abnormal movement of eyelid", "foreign body sensation in eye",
  "irregular appearing scalp", "swollen lymph nodes", "back pain", "neck pain", "low back pain",
  "pain of the anus", "pain during pregnancy", "pelvic pain", "impotence", "infant spitting up",
  "vomiting blood", "regurgitation", "burning abdominal pain", "restlessness",
  "symptoms of infants", "wheezing", "peripheral edema", "neck mass", "ear pain", "jaw swelling",
  "mouth dryness", "neck swelling", "knee pain", "foot or toe pain", "bowlegged or knock-kneed",
  "ankle pain", "bones are painful", "knee weakness", "elbow pain", "knee swelling",
  "skin moles", "knee lump or mass", "weight gain", "problems with movement",
  "knee stiffness or tightness", "leg swelling", "foot or toe swelling", "heartburn",
  "smoking problems", "muscle pain", "infant feeding problem", "recent weight loss",
  "problems with shape or size of breast", "underweight", "difficulty eating",
  "scanty menstrual flow", "vaginal pain", "vaginal redness", "vulvar irritation",
  "weakness", "decreased heart rate", "increased heart rate", "bleeding or discharge from nipple",
  "ringing in ear", "plugged feeling in ear", "itchy ear(s)", "frontal headache",
  "fluid in ear", "neck stiffness or tightness", "spots or clouds in vision", "eye redness",
  "lacrimation", "itchiness of eye", "blindness", "eye burns or stings", "itchy eyelid",
  "feeling cold", "decreased appetite", "excessive appetite", "excessive anger",
  "loss of sensation", "focal weakness", "slurring words", "symptoms of the face",
  "disturbance of memory", "paresthesia", "side pain", "fever", "shoulder pain",
  "shoulder stiffness or tightness", "shoulder weakness", "arm cramps or spasms",
  "shoulder swelling", "tongue lesions", "leg cramps or spasms", "abnormal appearing tongue",
  "ache all over", "lower body pain", "problems during pregnancy", "spotting or bleeding during pregnancy",
  "cramps and spasms", "upper abdominal pain", "stomach bloating", "changes in stool appearance",
  "unusual color or odor to urine", "kidney mass", "swollen abdomen", "symptoms of prostate",
  "leg stiffness or tightness", "difficulty breathing", "rib pain", "joint pain",
  "muscle stiffness or tightness", "pallor", "hand or finger lump or mass", "chills",
  "groin pain", "fatigue", "abdominal distention", "symptoms of the kidneys", "melena",
  "flushing", "coughing up sputum", "seizures", "delusions or hallucinations",
  "shoulder cramps or spasms", "joint stiffness or tightness", "pain or soreness of breast",
  "excessive urination at night", "bleeding from eye", "rectal bleeding", "constipation",
  "temper problems", "coryza", "wrist weakness", "eye strain", "hemoptysis", "lymphedema",
  "skin on leg or foot looks infected", "allergic reaction", "congestion in chest",
  "muscle swelling", "pus in urine", "abnormal size or shape of ear", "low back weakness",
  "sleepiness", "apnea", "abnormal breathing sounds", "excessive growth", "elbow cramps or spasms",
  "feeling hot and cold", "blood clots during menstrual periods", "absence of menstruation",
  "pulling at ears", "gum pain", "redness in ear", "fluid retention", "flu-like syndrome",
  "sinus congestion", "painful sinuses", "fears and phobias", "recent pregnancy",
  "uterine contractions", "burning chest pain", "back cramps or spasms", "stiffness all over",
  "muscle cramps, contractures, or spasms", "low back cramps or spasms", "back mass or lump",
  "nosebleed", "long menstrual periods", "heavy menstrual flow", "unpredictable menstruation",
  "painful menstruation", "infertility", "frequent menstruation", "sweating", "mass on eyelid",
  "swollen eye", "eyelid swelling", "eyelid lesion or rash", "unwanted hair",
]

interface DiagnosisResult {
  disease: string
  probability: number
  rank: number
}

interface PredictionResponse {
  predicted_disease: string
  confidence: number
  top_diagnoses: DiagnosisResult[]
  symptoms_checked: string[]
  symptoms_unknown: string[]
  timestamp: string
}

export default function DiagnosticAIPage() {
  const [allSymptoms, setAllSymptoms] = useState<string[]>(SYMPTOMS_LIST)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  // Fetch symptoms from API on mount
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await fetch(`${API_URL}/symptoms`)
        if (res.ok) {
          const data = await res.json()
          if (data.symptoms?.length > 0) {
            setAllSymptoms(data.symptoms)
          }
        }
      } catch (err) {
        console.log("[v0] Using local symptoms list")
      }
    }
    fetchSymptoms()
  }, [API_URL])

  const addSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev : [...prev, symptom]
    )
    setSearchTerm("")
    setShowDropdown(false)
  }, [])

  const removeSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom))
  }, [])

  const clearAll = useCallback(() => {
    setSelectedSymptoms([])
    setPrediction(null)
    setError(null)
  }, [])

  const getPrediction = async () => {
    if (selectedSymptoms.length === 0) return

    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          top_n: 3,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || "Server error")
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get diagnosis. Please check if the API is running."
      )
    } finally {
      setLoading(false)
    }
  }

  // Filter symptoms for search
  const filteredSymptoms = allSymptoms
    .filter(
      (s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedSymptoms.includes(s)
    )
    .slice(0, 8)

  return (
    <DashboardLayout userRole="doctor" pageTitle="Diagnostic AI">
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Symptom Input */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#0066FF]" />
                <div>
                  <CardTitle>Patient Symptom Assessment</CardTitle>
                  <p className="text-sm text-gray-600 font-normal mt-1">
                    Enter patient-reported symptoms for diagnostic analysis
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Search Box */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Symptoms Database
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Type symptom name (e.g., fever, cough, headache)..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowDropdown(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowDropdown(searchTerm.length > 0)}
                    className="pl-10 pr-10 py-3 text-base border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setShowDropdown(false)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Results */}
                {showDropdown && filteredSymptoms.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-auto">
                    {filteredSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => addSymptom(symptom)}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-700 capitalize">{symptom}</span>
                        <span className="ml-auto text-[#0066FF] text-sm font-medium">
                          + Add
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {showDropdown && searchTerm && filteredSymptoms.length === 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-500 text-sm">
                    No symptoms found matching &quot;{searchTerm}&quot;
                  </div>
                )}
              </div>

              {/* Selected Symptoms */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Documented Symptoms ({selectedSymptoms.length})
                  </label>
                  {selectedSymptoms.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAll}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                <div
                  className={`min-h-[140px] p-4 rounded-xl border-2 transition-all ${
                    selectedSymptoms.length > 0
                      ? "border-blue-200 bg-blue-50/50"
                      : "border-dashed border-gray-200 bg-gray-50"
                  }`}
                >
                  {selectedSymptoms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="secondary"
                          className="bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 px-3 py-2 flex items-center gap-2"
                        >
                          <span className="capitalize text-sm">{symptom}</span>
                          <button
                            onClick={() => removeSymptom(symptom)}
                            className="ml-1 hover:text-[#0052CC]"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Begin symptom documentation by searching above
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Diagnosis Button */}
              <Button
                onClick={getPrediction}
                disabled={loading || selectedSymptoms.length === 0}
                className="w-full bg-[#0066FF] text-white hover:bg-[#0052CC] disabled:bg-gray-300 disabled:cursor-not-allowed py-6 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Generate Differential Diagnosis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right Panel - Diagnostic Results */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <div>
                  <CardTitle>Diagnostic Results</CardTitle>
                  <p className="text-sm text-gray-600 font-normal mt-1">
                    AI-powered differential diagnosis predictions
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {!prediction && !loading && selectedSymptoms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">No diagnosis generated yet</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Document symptoms and click generate to see predictions
                  </p>
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Analyzing symptoms...</p>
                  <p className="text-gray-400 text-sm mt-1">
                    AI is processing the selected symptoms
                  </p>
                </div>
              ) : prediction ? (
                <div className="space-y-6">
                  {/* Primary Diagnosis */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Primary Diagnosis
                    </p>
                    <p className="text-2xl font-bold text-[#0A1F44] capitalize mb-2">
                      {prediction.predicted_disease}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Confidence:
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0066FF]"
                          style={{
                            width: `${Math.min(prediction.confidence * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#0066FF]">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Top Diagnoses */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Differential Diagnoses
                    </p>
                    <div className="space-y-3">
                      {prediction.top_diagnoses.map((diagnosis, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:border-[#0066FF] transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-900 capitalize">
                              {diagnosis.rank}. {diagnosis.disease}
                            </p>
                            <span className="text-sm font-bold text-[#0066FF]">
                              {(diagnosis.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0066FF]"
                              style={{
                                width: `${Math.min(diagnosis.probability * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms Summary */}
                  {prediction.symptoms_unknown?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-amber-900 mb-2">
                        Note: {prediction.symptoms_unknown.length} symptom(s) not found in database
                      </p>
                      <p className="text-xs text-amber-800">
                        {prediction.symptoms_unknown.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
