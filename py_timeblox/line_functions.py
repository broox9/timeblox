def create_dict_from_line(line):
  """
  takes in a list representing an entry and returns a dict
  """
  [event_date, event_start, event_end, event_type,
   event_details, event_distraction] = line
  line_dict = {
      'event_date': event_date,
      'event_start': event_start,
      'event_end': event_end,
      'event_type': event_type,
      'event_details': event_details,
      'event_distraction': int(event_distraction)
  }
  return line_dict
