import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  collection,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { useAuthStore } from "./AuthStore";

export const useNotesStore = defineStore("notesStore", () => {
  const notes = ref([]);
  const notesLoaded = ref(false)

  const authStore =useAuthStore()
  let notesCollectionRef ;
  let notesCollectionquery;
  let notesSnapshot= null
  

  const getNoteContentById = computed(() => {
    return (id) => {
      return notes.value.find((note) => note.id === id).content;
    };
  });

  const getNotes = async  () => {
    console.log(authStore.user.uid);
     notesCollectionRef = collection(db, 'users' ,authStore.user.uid, 'notes');
     notesCollectionquery = query(
      notesCollectionRef,
      orderBy("date", "desc")
    );


     notesSnapshot=onSnapshot(notesCollectionquery, (querySnapshot) => {
      let notesData = [];
      notesLoaded.value=false
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date :doc.data( ).date
        };
        notesData.push(note);
      });
        notes.value = notesData;
        notesLoaded.value=true
     
      
    });

    // const querySnapshot = await getDocs(collection(db, "notes"));
    // querySnapshot.forEach((doc) => {
    //  let note ={
    //   id:doc.id,
    //   content :doc.data().content
    //  }
    //  notes.value.push(note)
    // });
  };

const clearNotes=()=>{
  notes.value=[]
  if(notesSnapshot) notesSnapshot( )
}

  const totalNotesCount = computed(() => {
    return notes.value.length;
  });
  const totalCharactersCount = computed(() => {
    let count = 0;
    for (let note of notes.value) {
      count += note.content.length;
    }
    return count;
  });
  const addNote = async (noteContent) => {
    const currentDate = new Date().getTime().toString();
    // const note = {
    //   id: currentDate,
    //   content: noteContent,
    // };
    // notes.value.unshift(note);
    await addDoc(notesCollectionRef, {
      content: noteContent,
      date: currentDate,
    });
  };

  const deleteNote = async (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteDoc(doc(notesCollectionRef, noteId));

      alert("Note deleted successfully!");
    }
  };

  const updateNote = async (id, content) => {
    await updateDoc(doc(notesCollectionRef, id), {
      content,
    });
  };
  return {
    notes,
    updateNote,
    getNoteContentById,
    addNote,
    deleteNote,
    totalNotesCount,
    totalCharactersCount,
    getNotes,
    notesLoaded ,
    clearNotes
  };
});
