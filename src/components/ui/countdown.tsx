import * as React from 'react';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export function Countdown({
  targetDate,
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      if (targetDate > now) {
        setTimeLeft({
          days: differenceInDays(targetDate, now),
          hours: differenceInHours(targetDate, now) % 24,
          minutes:
            differenceInMinutes(targetDate, now) % 60,
          seconds:
            differenceInSeconds(targetDate, now) % 60,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={className}>
      <div className='grid grid-cols-4 gap-1 text-center'>
        <div>
          <span className='text-lg font-bold'>
            {timeLeft.days}
          </span>
          <span className='text-xs block text-muted-foreground'>
            días
          </span>
        </div>
        <div>
          <span className='text-lg font-bold'>
            {timeLeft.hours}
          </span>
          <span className='text-xs block text-muted-foreground'>
            horas
          </span>
        </div>
        <div>
          <span className='text-lg font-bold'>
            {timeLeft.minutes}
          </span>
          <span className='text-xs block text-muted-foreground'>
            min
          </span>
        </div>
        <div>
          <span className='text-lg font-bold'>
            {timeLeft.seconds}
          </span>
          <span className='text-xs block text-muted-foreground'>
            seg
          </span>
        </div>
      </div>
    </div>
  );
}
