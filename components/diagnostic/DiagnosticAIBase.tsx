import { useState, useEffect, useCallback } from 'react'
import { 
  Search, X, Activity, Stethoscope, AlertCircle, 
  CheckCircle2, Loader2, HeartPulse, Brain, 
  Thermometer, Wind, Droplets, Bone, Eye, Ear
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// Symptoms list from the medical dataset
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
  "symptoms of bladder", "irregular appearing nails", "itching of skin", "hurts to breath",
  "nailbiting", "skin dryness, peeling, scaliness, or roughness", "skin on arm or hand looks infected",
  "skin irritation", "itchy scalp", "hip swelling", "incontinence of stool",
  "foot or toe cramps or spasms", "warts", "bumps on penis", "too little hair",
  "foot or toe lump or mass", "skin rash", "mass or swelling around the anus", "low back swelling",
  "ankle swelling", "hip lump or mass", "drainage in throat", "dry or flaky scalp",
  "premenstrual tension or irritability", "feeling hot", "feet turned in",
  "foot or toe stiffness or tightness", "pelvic pressure", "elbow swelling",
  "elbow stiffness or tightness", "early or late onset of menopause", "mass on ear",
  "bleeding from ear", "hand or finger weakness", "low self-esteem", "throat irritation",
  "itching of the anus", "swollen or red tonsils", "irregular belly button", "swollen tongue",
  "lip sore", "vulvar sore", "hip stiffness or tightness", "mouth pain", "arm weakness",
  "leg lump or mass", "disturbance of smell or taste", "discharge in stools", "penis pain",
  "loss of sex drive", "obsessions and compulsions", "antisocial behavior", "neck cramps or spasms",
  "pupils unequal", "poor circulation", "thirst", "sleepwalking", "skin oiliness", "sneezing",
  "bladder mass", "knee cramps or spasms", "premature ejaculation", "leg weakness",
  "posture problems", "bleeding in mouth", "tongue bleeding", "change in skin mole size or color",
  "penis redness", "penile discharge", "shoulder lump or mass", "polyuria", "cloudy eye",
  "hysterical behavior", "arm lump or mass", "nightmares", "bleeding gums", "pain in gums",
  "bedwetting", "diaper rash", "lump or mass of breast", "vaginal bleeding after menopause",
  "infrequent menstruation", "mass on vulva", "jaw pain", "itching of scrotum",
  "postpartum problems of the breast", "eyelid retracted", "hesitancy", "elbow lump or mass",
  "muscle weakness", "throat redness", "joint swelling", "tongue pain", "redness in or around nose",
  "wrinkles on skin", "foot or toe weakness", "hand or finger cramps or spasms",
  "back stiffness or tightness", "wrist lump or mass", "skin pain", "low back stiffness or tightness",
  "low urine output", "skin on head or neck looks infected", "stuttering or stammering",
  "problems with orgasm", "nose deformity", "lump over jaw", "sore in nose", "hip weakness",
  "back swelling", "ankle stiffness or tightness", "ankle weakness", "neck weakness"
]

// Category icons for symptoms
const getSymptomIcon = (symptom: string) => {
  const lower = symptom.toLowerCase()
  if (lower.includes('chest') || lower.includes('heart') || lower.includes('breath') || lower.includes('cough')) 
    return <HeartPulse className="w-4 h-4" />
  if (lower.includes('head') || lower.includes('brain') || lower.includes('dizziness') || lower.includes('memory')) 
    return <Brain className="w-4 h-4" />
  if (lower.includes('fever') || lower.includes('hot') || lower.includes('cold') || lower.includes('chill')) 
    return <Thermometer className="w-4 h-4" />
  if (lower.includes('pain') || lower.includes('ache')) 
    return <Activity className="w-4 h-4" />
  if (lower.includes('eye') || lower.includes('vision')) 
    return <Eye className="w-4 h-4" />
  if (lower.includes('ear') || lower.includes('hearing')) 
    return <Ear className="w-4 h-4" />
  if (lower.includes('blood') || lower.includes('bleeding')) 
    return <Droplets className="w-4 h-4" />
  if (lower.includes('bone') || lower.includes('joint') || lower.includes('muscle')) 
    return <Bone className="w-4 h-4" />
  return <Wind className="w-4 h-4" />
}

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

interface ModelMetrics {
  accuracy: number
  f1_score?: number
  model_loaded: boolean
  total_symptoms?: number
  total_diseases?: number
}

function App() {
  const [allSymptoms, setAllSymptoms] = useState<string[]>(SYMPTOMS_LIST)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const API_URL = 'http://localhost:8000'

  // Fetch model health/metrics on mount
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${API_URL}/health`)
        if (res.ok) {
          const data = await res.json()
          setModelMetrics(data)
        }
      } catch {
        console.log('API not available, using local symptoms')
      }
    }
    fetchHealth()

    // Try to fetch symptoms from API
    const fetchSymptoms = async () => {
      try {
        const res = await fetch(`${API_URL}/symptoms`)
        if (res.ok) {
          const data = await res.json()
          if (data.symptoms?.length > 0) {
            setAllSymptoms(data.symptoms)
          }
        }
      } catch {
        // Keep using local symptoms
      }
    }
    fetchSymptoms()
  }, [])

  const toggleSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
    setPrediction(null)
  }, [])

  const addSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev : [...prev, symptom]
    )
    setSearchTerm('')
    setShowDropdown(false)
    setPrediction(null)
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          top_n: 3
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Server error')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get diagnosis. Please check if the Python API is running.')
    } finally {
      setLoading(false)
    }
  }

  // Filter symptoms for search
  const filteredSymptoms = allSymptoms.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedSymptoms.includes(s)
  ).slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Clinical Decision Support System</h1>
                <p className="text-blue-100 text-sm">AI-Powered Diagnostic Assistant for Healthcare Professionals</p>
              </div>
            </div>
            
            {modelMetrics && (
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-center">
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Model Accuracy</p>
                  <p className="text-xl font-bold">{(modelMetrics.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">F1-Score</p>
                  <p className="text-xl font-bold">
                    {modelMetrics.f1_score ? (modelMetrics.f1_score * 100).toFixed(1) + '%' : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <Alert variant="destructive" className="border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Symptom Input */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-blue-600" />
                Patient Symptom Assessment
              </CardTitle>
              <p className="text-sm text-slate-500">Enter patient-reported symptoms for diagnostic analysis</p>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Search Box */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Symptoms Database
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Type symptom name (e.g., fever, cough, headache)..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowDropdown(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowDropdown(searchTerm.length > 0)}
                    className="pl-10 pr-10 py-3 h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setShowDropdown(false)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Dropdown Results */}
                {showDropdown && filteredSymptoms.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 max-h-64 overflow-auto">
                    {filteredSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => addSymptom(symptom)}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0"
                      >
                        <span className="text-slate-400">{getSymptomIcon(symptom)}</span>
                        <span className="text-slate-700 capitalize">{symptom}</span>
                        <span className="ml-auto text-blue-600 text-sm font-medium">+ Add</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {showDropdown && searchTerm && filteredSymptoms.length === 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 p-4 text-center text-slate-500">
                    No symptoms found matching &quot;{searchTerm}&quot;
                  </div>
                )}
              </div>

              {/* Selected Symptoms */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    Documented Symptoms ({selectedSymptoms.length})
                  </label>
                  {selectedSymptoms.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Clear All
                    </Button>
                  )}
                </div>
                
                <div className={cn(
                  "min-h-[140px] p-4 rounded-xl border-2 border-dashed transition-colors",
                  selectedSymptoms.length > 0 
                    ? "border-blue-200 bg-blue-50/50" 
                    : "border-slate-200 bg-slate-50"
                )}>
                  {selectedSymptoms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="secondary"
                          className="px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center gap-2"
                          onClick={() => toggleSymptom(symptom)}
                        >
                          {getSymptomIcon(symptom)}
                          <span className="capitalize">{symptom}</span>
                          <X className="w-3 h-3 ml-1 opacity-70 hover:opacity-100" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-4">
                      <Activity className="w-10 h-10 mb-2 opacity-30" />
                      <p className="text-sm">Begin symptom documentation by searching above</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={getPrediction}
                disabled={loading || selectedSymptoms.length === 0}
                className="w-full h-14 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Clinical Data...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Generate Differential Diagnosis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right Panel - Results */}
          <Card className={cn(
            "shadow-xl border-0 overflow-hidden transition-all duration-500",
            prediction ? "bg-white" : "bg-slate-50"
          )}>
            <CardHeader className={cn(
              "border-b",
              prediction ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100" : "bg-slate-50 border-slate-100"
            )}>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Stethoscope className={cn("w-5 h-5", prediction ? "text-emerald-600" : "text-slate-400")} />
                Diagnostic Results
              </CardTitle>
              <p className="text-sm text-slate-500">
                {prediction ? 'AI-generated differential diagnosis' : 'Diagnostic results will appear here'}
              </p>
            </CardHeader>

            <CardContent className="p-6">
              {prediction ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Primary Diagnosis */}
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg">
                    <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-2">Primary Diagnosis</p>
                    <h3 className="text-3xl font-bold">{prediction.predicted_disease}</h3>
                  </div>

                  {/* Confidence Meter */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Confidence Level</span>
                      <span className="text-lg font-bold text-emerald-600">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={prediction.confidence * 100} 
                      className="h-3 bg-slate-100"
                    />
                  </div>

                  <Separator />

                  {/* Differential Diagnosis */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                      Differential Diagnosis
                    </h4>
                    <div className="space-y-3">
                      {prediction.top_diagnoses?.map((diag, idx) => (
                        <div
                          key={diag.rank}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md",
                            idx === 0 
                              ? "bg-emerald-50 border-emerald-200" 
                              : "bg-white border-slate-200"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            idx === 0 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-200 text-slate-600"
                          )}>
                            {diag.rank}
                          </div>
                          <div className="flex-1">
                            <p className={cn(
                              "font-semibold",
                              idx === 0 ? "text-emerald-900" : "text-slate-700"
                            )}>
                              {diag.disease}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={cn(
                              "text-lg font-bold",
                              idx === 0 ? "text-emerald-600" : "text-slate-500"
                            )}>
                              {(diag.probability * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Advisory */}
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 text-sm">
                      <strong className="block mb-1">Clinical Advisory</strong>
                      This AI-generated differential diagnosis is intended to support clinical decision-making 
                      and should not replace professional medical judgment. Always correlate with patient 
                      history, physical examination, and appropriate diagnostic tests.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
                  {loading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                      <p className="text-slate-600">Processing clinical data...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Stethoscope className="w-10 h-10 opacity-30" />
                      </div>
                      <p className="text-lg font-medium text-slate-500">No diagnosis generated yet</p>
                      <p className="text-sm text-slate-400">Document symptoms and click generate</p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
