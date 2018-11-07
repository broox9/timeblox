#!/usr/bin/env python
import csv
import logging
import sys # read command line 
import getopt # parse command line arguements
import json

# local imports
import line_functions
from chart_functions import group_by_type, rollup_durations

# the basic way works
# file_lines = open('./september.tsv', 'r').readlines()
# number_5 = file_lines[4]
# clean_5 = number_5.strip().split('\t')
# print(id(number_5), number_5)
# print(id(clean_5), clean_5) # different id

logging.warning('opening a file')
lines = []

with open('./september.tsv') as tsv_file:
  # using 'enumerate' so an index is available. csv.reader returns an iterable
  file_lines = enumerate(csv.reader(tsv_file, delimiter = '\t'))
  for idx, line in file_lines:
    # no need to clean
    if idx is not 0:
      this_dict = line_functions.create_dict_from_line(line)
      lines.append(this_dict)

# print(lines)

def print_rollup(name):
  """
    attempts to print the total minutes and hours of the data grouping
  """
  display_str = '{0}: {1} minutes / {2} hours'
  data_minutes = rollup_durations(group_data[name])
  if data_minutes is not None:
    data_hours = data_minutes / 60
    print(display_str.format(name, data_minutes, data_hours))
  else:
    print('There was an error processing "{0}" data'.format(name))



group_data = group_by_type(lines)

meetings = rollup_durations(group_data['meeting'])
sprint_work = rollup_durations(group_data['sprint work'])
breaks = rollup_durations(group_data['break'])
other = rollup_durations(group_data['other'])

for grouping in group_data:
  print_rollup(grouping)

# print('meetings: {0} minutes / {1} hours'.format(meetings, meetings / 60 ))
# print('sprint work: {0} minutes / {1} hours'.format(sprint_work, sprint_work / 60 ))
# print('breaks: {0} hours'.format(rollup_durations( ))
# print('other: {0} hours'.format(rollup_durations( ))
print(json.dumps(group_data))


