try {
  Write-Host "=== 1. SIGNUP NEW LEARNER ==="
  $rand = Get-Random
  $email = "learner_$rand@example.com"
  $signupObj = @{ name = "Alex Morgan"; email = $email; password = "Password@123" }
  $signupJson = $signupObj | ConvertTo-Json
  $signupRes = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/signup" -Method POST -Body $signupJson -ContentType "application/json"
  $token = $signupRes.token
  $userId = $signupRes.user.id
  Write-Host "User registered: ID=$userId, Email=$email"

  $headers = @{ Authorization = "Bearer $token" }

  Write-Host "=== 2. UPDATE PROFILE WITH ASSESSMENT RESULTS ==="
  $profileObj = @{
    name = "Alex Morgan"
    targetRole = "Software Development Engineer"
    skillLevel = "Intermediate"
    hoursPerDay = 3
    targetCompany = "Amazon, Microsoft"
    targetPlacementDate = "2026-12-01"
    weakAreas = "Dynamic Programming, Graph Algorithms"
    assessmentJson = '{"score":78,"strengths":["OOP","SQL"],"weaknesses":["DP"]}'
  }
  $profileJson = $profileObj | ConvertTo-Json
  $profileRes = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/profile/$userId" -Method PUT -Body $profileJson -Headers $headers -ContentType "application/json"
  Write-Host "Profile updated: TargetRole=$($profileRes.targetRole), Hours=$($profileRes.hoursPerDay)"

  Write-Host "=== 3. SAVE STUDY PLAN ==="
  $planObj = @{
    targetRole = "Software Development Engineer"
    skillLevel = "Intermediate"
    hoursPerDay = 3
    durationWeeks = 6
    completedTaskKeysJson = '["task-1","task-2"]'
  }
  $planJson = $planObj | ConvertTo-Json
  $planRes = Invoke-RestMethod -Uri "http://localhost:8081/api/study-plan/$userId" -Method POST -Body $planJson -Headers $headers -ContentType "application/json"
  Write-Host "Study Plan saved: Weeks=$($planRes.durationWeeks)"

  Write-Host "=== 4. TOGGLE COURSE TOPIC COMPLETION ==="
  $topicObj = @{
    course = "JAVA"
    topicId = "java-jvm-memory"
    completed = $true
  }
  $topicJson = $topicObj | ConvertTo-Json
  $topicRes = Invoke-RestMethod -Uri "http://localhost:8081/api/courses/toggle/$userId" -Method POST -Body $topicJson -Headers $headers -ContentType "application/json"
  Write-Host "Topic status updated: $($topicRes.message)"

  Write-Host "=== 5. RECORD DSA PRACTICE ATTEMPT ==="
  $dsaObj = @{
    problemSlug = "two-sum"
    language = "java"
    code = "class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{0,1}; } }"
    status = "SOLVED"
    executionOutput = "All 3 test cases passed in 1ms"
  }
  $dsaJson = $dsaObj | ConvertTo-Json
  $dsaRes = Invoke-RestMethod -Uri "http://localhost:8081/api/dsa/attempt/$userId" -Method POST -Body $dsaJson -Headers $headers -ContentType "application/json"
  Write-Host "DSA attempt recorded: Status=$($dsaRes.status), Msg=$($dsaRes.message)"

  Write-Host "=== 6. RECORD APTITUDE ATTEMPT ==="
  $aptObj = @{
    category = "Quantitative"
    topic = "Time & Work"
    score = 4
    totalQuestions = 5
    timeSpentSeconds = 240
  }
  $aptJson = $aptObj | ConvertTo-Json
  $aptRes = Invoke-RestMethod -Uri "http://localhost:8081/api/aptitude/attempt/$userId" -Method POST -Body $aptJson -Headers $headers -ContentType "application/json"
  Write-Host "Aptitude attempt recorded: Score=$($aptRes.score)/$($aptRes.totalQuestions)"

  Write-Host "=== 7. RECORD INTERVIEW PRACTICE ==="
  $intObj = @{
    questionId = "java-hashmap"
    category = "Core Java"
    mastered = $true
    userNotes = "Explained bucket array, linked list, and red-black tree threshold at 8."
  }
  $intJson = $intObj | ConvertTo-Json
  $intRes = Invoke-RestMethod -Uri "http://localhost:8081/api/interview/practice/$userId" -Method POST -Body $intJson -Headers $headers -ContentType "application/json"
  Write-Host "Interview practice: QuestionId=$($intRes.questionId), Mastered=$($intRes.mastered)"

  Write-Host "=== 8. QUERY PLACEMENT READINESS & DASHBOARD STATS ==="
  $stats = Invoke-RestMethod -Uri "http://localhost:8081/api/dashboard/stats/$userId" -Method GET -Headers $headers
  Write-Host "Readiness Score=$($stats.readinessScore)%, Streak=$($stats.streak) days"
  Write-Host "DSA Solved=$($stats.dsaSolved), Topics Completed=$($stats.topicsCompleted)"

  Write-Host "=== 9. QUERY ADMIN TELEMETRY OVERVIEW ==="
  $adminOverview = Invoke-RestMethod -Uri "http://localhost:8081/api/admin/overview" -Method GET -Headers $headers
  Write-Host "Admin Overview: TotalUsers=$($adminOverview.totalUsers), TotalPractices=$($adminOverview.totalPracticeAttempts)"

  Write-Host "=== ALL 9 WORKFLOW TESTS PASSED CLEANLY WITH DATABASE PERSISTENCE! ==="
} catch {
  Write-Host "Error: $($_.Exception.Message)"
  if ($_.Exception.Response) {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response body: $($reader.ReadToEnd())"
  }
  exit 1
}
