import twilio from "twilio";
import { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/verificationCheck";

enum SMSService {
  Twilio,
  PlayMobile,
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class Verification {
  public create: (phone: string) => void;
  public verify: (
    phone: string,
    code: string
  ) => Promise<VerificationCheckInstance>;

  constructor(service) {
    if (service === SMSService.Twilio) {
      this.create = this.createTwilioVerification;
      this.verify = this.verifyTwilioVerification;
    }
  }

  private createTwilioVerification = async (phone: string) => {
    return client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: phone, channel: "sms" });
  };

  private verifyTwilioVerification = async (phone: string, code: string) => {
    return client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code: code });
  };
}

export default new Verification(SMSService.Twilio);
