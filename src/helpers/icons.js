import {
    faLockOpen,
    faEnvelopeSquare,
    faMapMarkedAlt,
    faPhoneSquareAlt,
    faTrash,
    faSignOutAlt,
    faEdit,
    faSpinner,
    faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
    return library.add(
        faLockOpen,
        faEnvelopeSquare,
        faMapMarkedAlt,
        faPhoneSquareAlt,
        faTrash,
        faSignOutAlt,
        faEdit,
        faSpinner,
        faPlusSquare
    );
};

export default Icons;
