import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  try {
    const result = await db
      .insert(goals)
      .values({
        title,
        desiredWeeklyFrequency,
      })
      .returning()

    const goal = result[0]

    return {
      goal,
    }
  } catch (error) {
    console.error('Error creating goal:', error)
    throw error // Re-lançar o erro para tratamento adequado
  }
}
