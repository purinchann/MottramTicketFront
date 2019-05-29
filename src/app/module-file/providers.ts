import { AngularFirestore } from 'angularfire2/firestore';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { UserDataStore } from '../store/user.store';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const providers = [
    AngularFirestore,
    // Service
    ApiService,
    AuthService,
    // Guard
    AuthGuard,
    //DataStore
    UserDataStore,

    MatDatepickerModule
]