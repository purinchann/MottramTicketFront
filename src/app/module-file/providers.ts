import { AngularFirestore } from 'angularfire2/firestore';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';

export const providers = [
    AngularFirestore,
    // Service
    ApiService,
    AuthService,
    // Guard
    AuthGuard,
]