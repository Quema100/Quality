import os
import sys
import signal
import getpass
import time as Tim
import numpy as np
import soundfile as sf
import sounddevice as sd
import matplotlib.pyplot as plt
from Exit.on_close import on_close
from Exit.signal_handler import signal_handler

def Audio_Visualization(path):

    wav_file_path = path

    slowdown_factor = .95
    # read WAV file 
    audio_data, sample_rate = sf.read(wav_file_path)

    audio_data = audio_data[:, 0]

    audio_data = np.interp(np.arange(0, len(audio_data), slowdown_factor), np.arange(0, len(audio_data)), audio_data)

    # FFT set
    fft_size = 8192
    hop_size = fft_size // 2

    time = np.arange(0, len(audio_data)) / sample_rate

    def play_audio(outdata, frames, time, status):
        nonlocal audio_data, audio_data_index
        if audio_data_index + frames < len(audio_data):
            outdata[: frames, :] = np.tile(audio_data[audio_data_index : audio_data_index + frames], (2, 1)).T
            audio_data_index += frames
        else:
            outdata[: len(audio_data) - audio_data_index, 0] = audio_data[audio_data_index :]
            outdata[len(audio_data) - audio_data_index :, 0] = 0
            audio_data_index = len(audio_data)

    signal.signal(signal.SIGINT, signal_handler)

    min_frequency = 0  
    max_frequency = 2000  

    audio_data_index = 0
    fig = plt.figure("Audio Visualization", facecolor='black') 
    fig.canvas.mpl_connect('close_event', on_close)  
    plt.ion()  

    with sd.OutputStream(callback=play_audio, channels=2, samplerate=sample_rate, blocksize=2048):
        while audio_data_index < len(audio_data):
            if len(audio_data) - audio_data_index < fft_size:
                break
            
            audio_chunk = audio_data[audio_data_index : audio_data_index + fft_size]
            audio_data_index += hop_size

           
            spectrum = np.abs(np.fft.fft(audio_chunk))
            frequencies = np.fft.fftfreq(len(spectrum), d=1/sample_rate)

            valid_indices = np.where((frequencies >= min_frequency) & (frequencies <= max_frequency))
            valid_frequencies = frequencies[valid_indices]
            valid_spectrum = spectrum[valid_indices]
            
            wave = np.sin(1/2 * np.pi * valid_frequencies * time[audio_data_index])

            plt.clf()  
            fig.canvas.toolbar.pack_forget()
            plt.plot(valid_frequencies, valid_spectrum * wave, 'w')
            plt.grid()
            plt.gca().set_facecolor('black')       
            plt.subplots_adjust(left=0, right=1, top=1, bottom=0)  
            plt.axis('off')  
            plt.pause(.33)  
            plt.draw()
        plt.ioff()  
        Tim.sleep(2)
    plt.close()    
    print("Exit")
    sys.exit(0)