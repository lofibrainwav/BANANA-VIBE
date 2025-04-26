import { useState, useEffect, createContext, useContext } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';

// 인증 컨텍스트 생성
const AuthContext = createContext<any>({});

// 인증 제공자 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 사용자 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // 이메일/비밀번호로 로그인
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // 회원가입
  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // 사용자 프로필 업데이트
    await updateProfile(userCredential.user, { displayName });
    return userCredential;
  };
  
  // 로그아웃
  const logOut = () => {
    return signOut(auth);
  };
  
  // Google로 로그인
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  // 비밀번호 재설정 이메일 전송
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  // ID 토큰 가져오기
  const getIdToken = () => {
    return user ? user.getIdToken() : null;
  };
  
  // 컨텍스트 값
  const value = {
    user,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    resetPassword,
    getIdToken
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 인증 훅
export const useAuth = () => useContext(AuthContext);
