import { usePushNotifications } from '../../hooks/usePushNotifications'

export function NotificationSettings() {
  const { status, error, enable, disable } = usePushNotifications()

  return (
    <div className="mt-6 rounded-lg border border-noir/10 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-noir">Push Notifications</h2>
          <p className="mt-1 text-sm text-noir/60">
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
            className="shrink-0 rounded-full bg-crimson px-5 py-2 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-noir"
          >
            Enable
          </button>
        )}
        {status === 'enabled' && (
          <button
            onClick={disable}
            className="shrink-0 rounded-full border border-crimson/40 px-5 py-2 text-sm font-semibold tracking-wide text-crimson uppercase transition-colors hover:bg-crimson hover:text-white"
          >
            Disable
          </button>
        )}
      </div>
    </div>
  )
}
