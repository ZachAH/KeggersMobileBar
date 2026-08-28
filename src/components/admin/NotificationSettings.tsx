import { usePushNotifications } from '../../hooks/usePushNotifications'

export function NotificationSettings() {
  const { status, error, enable, disable } = usePushNotifications()

  return (
    <div className="mt-6 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-cream">Push Notifications</h2>
          <p className="mt-1 text-sm text-cream/65">
            {status === 'enabled' && "You'll get a notification here whenever a new inquiry comes in."}
            {status === 'idle' && 'Get notified the moment someone submits the contact form.'}
            {status === 'denied' &&
              'Notifications are blocked in your browser settings — enable them there to turn this on.'}
            {status === 'unsupported' &&
              "This browser doesn't support push notifications. On iPhone, add this site to your Home Screen first (Share → Add to Home Screen), then try again from there."}
            {status === 'checking' && 'Checking notification status…'}
            {status === 'error' && (error ?? 'Something went wrong enabling notifications.')}
          </p>
        </div>
        {(status === 'idle' || status === 'error') && (
          <button
            onClick={enable}
            className="shrink-0 rounded-full bg-gold px-5 py-2 text-sm font-bold tracking-wide text-plum uppercase transition-colors hover:bg-cream"
          >
            Enable
          </button>
        )}
        {status === 'enabled' && (
          <button
            onClick={disable}
            className="shrink-0 rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold tracking-wide text-gold uppercase transition-colors hover:bg-gold hover:text-plum"
          >
            Disable
          </button>
        )}
      </div>
    </div>
  )
}
