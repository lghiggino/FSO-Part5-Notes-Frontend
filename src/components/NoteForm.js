export const NoteForm = ({ onSubmit, value, handleNoteChange }) => (
  <>
    <h2>Create a new note</h2>
    
    <form onSubmit={onSubmit}>
      <input value={value} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  </>
);
