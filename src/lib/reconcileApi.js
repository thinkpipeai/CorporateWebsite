import { getSupabaseConfigMessage, isSupabaseConfigured, supabase } from './supabase.js'
import { formatDisplayDate, getTodayRange } from './dateUtils.js'

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(getSupabaseConfigMessage())
  }
  return supabase
}

export async function login(username, password) {
  const client = requireSupabase()
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedPassword = password.trim()

  const { data, error } = await client
    .from('employees')
    .select('id, name, username, role, commission_rate')
    .eq('username', normalizedUsername)
    .eq('password', normalizedPassword)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function checkEmployeesAccessible() {
  const client = requireSupabase()
  const { data, error } = await client.from('employees').select('id').limit(1)
  if (error) throw error
  return (data?.length ?? 0) > 0
}

export async function fetchEmployees() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('employees')
    .select('id, name, username, role, commission_rate')
    .eq('role', 'employee')
    .order('name')

  if (error) throw error
  return data ?? []
}

export async function createEmployee({ name, username, password, commissionRate }) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('employees')
    .insert({
      name,
      username,
      password,
      role: 'employee',
      commission_rate: commissionRate,
    })
    .select('id, name, username, role, commission_rate')
    .single()

  if (error) throw error
  return data
}

export async function deleteEmployee(id) {
  const client = requireSupabase()
  const { error } = await client.from('employees').delete().eq('id', id)
  if (error) throw error
}

export async function fetchTodayRecords() {
  const client = requireSupabase()
  const { start, end } = getTodayRange()
  const { data, error } = await client
    .from('records')
    .select('id, employee_id, date, service, payment, amount, tip, employees(name)')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function fetchEmployeeTodayRecords(employeeId) {
  const client = requireSupabase()
  const { start, end } = getTodayRange()
  const { data, error } = await client
    .from('records')
    .select('id, employee_id, date, service, payment, amount, tip')
    .eq('employee_id', employeeId)
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createRecord({ employeeId, date, service, payment, amount, tip }) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('records')
    .insert({
      employee_id: employeeId,
      date: new Date(date).toISOString(),
      service,
      payment,
      amount,
      tip,
    })
    .select('id, employee_id, date, service, payment, amount, tip')
    .single()

  if (error) throw error
  return data
}

export async function fetchTodaySummary() {
  const records = await fetchTodayRecords()
  const totalRevenue = records.reduce((sum, record) => sum + Number(record.amount) + Number(record.tip), 0)
  const employeeIds = new Set(records.map((record) => record.employee_id))

  return {
    totalRevenue,
    totalRecords: records.length,
    employeesToday: employeeIds.size,
  }
}

export async function fetchSettlementForToday() {
  const client = requireSupabase()
  const today = formatDisplayDate()
  const { data, error } = await client
    .from('settlements')
    .select('id, settlement_date, data, created_at')
    .eq('settlement_date', today)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function fetchAllSettlements() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('settlements')
    .select('id, settlement_date, data, created_at')
    .order('settlement_date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function generateSettlement() {
  const records = await fetchTodayRecords()
  const employees = await fetchEmployees()
  const employeeMap = new Map(employees.map((employee) => [employee.id, employee]))
  const today = formatDisplayDate()

  const byEmployee = new Map()
  for (const record of records) {
    const current = byEmployee.get(record.employee_id) ?? {
      employee_id: record.employee_id,
      name: record.employees?.name ?? employeeMap.get(record.employee_id)?.name ?? 'Unknown',
      record_count: 0,
      total_amount: 0,
      total_tip: 0,
      commission_rate: Number(employeeMap.get(record.employee_id)?.commission_rate ?? 0),
    }
    current.record_count += 1
    current.total_amount += Number(record.amount)
    current.total_tip += Number(record.tip)
    byEmployee.set(record.employee_id, current)
  }

  const employeeBreakdown = [...byEmployee.values()].map((item) => ({
    ...item,
    gross: item.total_amount + item.total_tip,
    earnings: (item.total_amount + item.total_tip) * item.commission_rate,
  }))

  const settlementData = {
    date: today,
    total_revenue: records.reduce((sum, record) => sum + Number(record.amount) + Number(record.tip), 0),
    total_records: records.length,
    employees: employeeBreakdown,
  }

  const client = requireSupabase()
  const { data, error } = await client
    .from('settlements')
    .upsert(
      {
        settlement_date: today,
        data: settlementData,
      },
      { onConflict: 'settlement_date' },
    )
    .select('id, settlement_date, data, created_at')
    .single()

  if (error) throw error
  return data
}
