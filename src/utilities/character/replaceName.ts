import { CharacterEditorState } from '@/types/character'

const replaceName = (characterEditorState: CharacterEditorState): CharacterEditorState => {
  return {
    ...characterEditorState,
    description: characterEditorState.description.replaceAll(characterEditorState.name, '{{char}}'),
    personality: characterEditorState.personality.replaceAll(characterEditorState.name, '{{char}}'),
    mes_example: characterEditorState.mes_example.replaceAll(characterEditorState.name, '{{char}}'),
    scenario: characterEditorState.scenario.replaceAll(characterEditorState.name, '{{char}}'),
    first_mes: characterEditorState.first_mes.replaceAll(characterEditorState.name, '{{char}}'),
    alternate_greetings: characterEditorState.alternate_greetings.map((greeting) => greeting.replaceAll(characterEditorState.name, '{{char}}')),
    system_prompt: characterEditorState.system_prompt.replaceAll(characterEditorState.name, '{{char}}'),
    post_history_instructions: characterEditorState.post_history_instructions.replaceAll(characterEditorState.name, '{{char}}')
  }
}

export default replaceName
