import { autoloadAPIComponents } from "registration";

// Loading all different APIs
import "apis/Vibration";
import "apis/Battery";
import "apis/Geolocation";

// TODO: Dynamic debugging mode
autoloadAPIComponents(true);
