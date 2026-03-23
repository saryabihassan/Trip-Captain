import { PersonaFilterEngine, PersonaType } from './PersonaFilterEngine.js';

const runPersonaFilter = async () => {
  const engine = new PersonaFilterEngine();
  const persona: PersonaType = 'Luxury'; // For Topic 10 demonstration
  
  try {
    await engine.applyPersona(persona);
  } catch (error: any) {
    console.error('❌ Persona Filter Failed:', error.message);
    process.exit(1);
  }
};

runPersonaFilter();
