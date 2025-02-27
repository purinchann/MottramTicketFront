import { AngularFirestore } from 'angularfire2/firestore';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { UserDataStore } from '../store/user.store';
import { MenuDataStore } from 'src/app/store/menu.store';
import { ShopDataStore } from 'src/app/store/shop.store';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CartDataStore } from '../store/cart.store';
import { OrderDataStore } from '../store/order.store';
import { MessageDataStore } from '../store/message.store';
import { AdDataStore } from '../store/ad.store';

export const providers = [
    AngularFirestore,
    // Service
    ApiService,
    AuthService,
    // Guard
    AuthGuard,
    //DataStore
    UserDataStore,
    MenuDataStore,
    ShopDataStore,
    CartDataStore,
    OrderDataStore,
    MessageDataStore,
    AdDataStore,

    MatDatepickerModule
]