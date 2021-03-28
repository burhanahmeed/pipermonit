import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useRoute } from 'vue-router';

export default function useSession () {
  const route = useRoute();
  const currentSession = ref('');
  const tmpSession = ref('');
  onMounted(() => {
    const currSession = localStorage.getItem('session');
    const sessSession = sessionStorage.getItem('session');
    if (route.query.session) {
      if (currSession) {
        sessionStorage.setItem('session', route?.query?.session)
      }
    } else {
      let sessionId = currSession;
      if (sessSession) {
        currentSession.value = sessSession;
      } else
      if (currSession) {
        currentSession.value = currSession;
      } else {
        let uuid = uuidv4();
        sessionId = uuid;
        localStorage.setItem('session', uuid); 
        currentSession.value = sessionId;
      }
    }
  })
  return {currentSession, tmpSession}
}