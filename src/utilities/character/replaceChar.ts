import { CharacterEditorState } from '@/types/character'

const replaceChar = (
  characterEditorState: CharacterEditorState
): CharacterEditorState => {
  return {
    ...characterEditorState,
    description: characterEditorState.description.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    personality: characterEditorState.personality.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    mes_example: characterEditorState.mes_example.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    scenario: characterEditorState.scenario.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    first_mes: characterEditorState.first_mes.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    alternate_greetings: characterEditorState.alternate_greetings.map(
      (greeting) => greeting.replaceAll('{{char}}', characterEditorState.name)
    ),
    system_prompt: characterEditorState.system_prompt.replaceAll(
      '{{char}}',
      characterEditorState.name
    ),
    post_history_instructions:
      characterEditorState.post_history_instructions.replaceAll(
        '{{char}}',
        characterEditorState.name
      )
  }
}

export default replaceChar
