import statistics
from datetime import datetime, time, timedelta

grouped_data = {}

def group_by_type(data):
  """
  takes a list of tsv data and sorts by event_type
  """
  for item in data:
    if item['event_type'] in grouped_data:
      grouped_data[item['event_type']].append(item)
    else:
      grouped_data[item['event_type']] = [item]
  
  return grouped_data

def rollup_durations(someList):
  # has to be inited as a time delta
  total = timedelta(0)
  
  for item in someList:
    today = datetime.min
    start = time.fromisoformat(item['event_start'])
    end = time.fromisoformat(item['event_end'])
    # returns a time delta
    duration = datetime.combine(today, end) - datetime.combine(today, start)
    total += duration
    # print(duration)
  return total.total_seconds() / 60



